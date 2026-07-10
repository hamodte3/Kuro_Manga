package com.kuro.data.extension

import android.util.Log
import com.kuro.core_api.ArabicMangaData
import com.kuro.core_api.Chapter
import com.kuro.core_api.Manga
import com.kuro.core_api.MangaSource
import com.whl.quickjs.wrapper.QuickJSContext
import com.whl.quickjs.android.QuickJSLoader
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

interface KuroNetworkBridge {
    fun getHtml(targetUrl: String): String
}

class JsMangaSource(
    override val name: String,
    private val jsScript: String
) : MangaSource {

    override val pkgName: String = "" // سيتم تخصيصه لاحقاً
    override val version: String = "1.0.0"

    override val headers: Map<String, String> = mapOf("Referer" to "https://azorafly.com/")

    // 🚀 دالة مساعدة لإنشاء المحرك وحقن النت بثانية
    private fun createQuickJSAndInjectNetwork(): QuickJSContext {
        QuickJSLoader.init()
        val quickJS = QuickJSContext.create()
        val bridge = object : KuroNetworkBridge {
            override fun getHtml(targetUrl: String): String {
                return try {
                    val connection = URL(targetUrl).openConnection() as HttpURLConnection
                    connection.requestMethod = "GET"
                    connection.setRequestProperty("User-Agent", "Mozilla/5.0")
                    connection.inputStream.bufferedReader().use { it.readText() }
                } catch (e: Exception) { "" }
            }
        }
        
        val kuroNet = quickJS.createNewJSObject()
        kuroNet.setProperty("getHtml") { args ->
            bridge.getHtml(args[0]?.toString() ?: "")
        }
        quickJS.globalObject.setProperty("KuroNet", kuroNet)
        
        return quickJS
    }

    override suspend fun getLatestManga(page: Int, query: String?): List<Manga> = withContext(Dispatchers.IO) {
        var quickJS: QuickJSContext? = null
        try {
            quickJS = createQuickJSAndInjectNetwork()
            quickJS.evaluate(jsScript)

            val safeQuery = if (query.isNullOrBlank()) "null" else "'${query.replace("'", "\\'")}'"
            val jsonResult = quickJS.evaluate("fetchLatestManga($page, $safeQuery);")?.toString() ?: "[]"
            parseMangaListJson(jsonResult)
        } catch (e: Throwable) {
            listOf(
                Manga(
                    title = "خطأ: ${e.message}",
                    coverUrl = "",
                    mangaUrl = "error",
                    sourceName = "Debugger",
                    headers = this@JsMangaSource.headers
                )
            )
        } finally {
            quickJS?.destroy()
        }
    }

    // 🚀 مسحنا الـ TODO وبرمجنا سحب التفاصيل والفصول!
    override suspend fun getMangaDetails(url: String): ArabicMangaData = withContext(Dispatchers.IO) {
        var quickJS: QuickJSContext? = null
        try {
            quickJS = createQuickJSAndInjectNetwork()
            quickJS.evaluate(jsScript)

            val safeUrl = "'${url.replace("'", "\\'")}'"
            val jsonResult = quickJS.evaluate("fetchMangaDetails($safeUrl);")?.toString() ?: "{}"
            
            val obj = JSONObject(jsonResult)
            val chaptersArray = obj.optJSONArray("chapters") ?: JSONArray()
            val chapters = mutableListOf<Chapter>()
            
            for (i in 0 until chaptersArray.length()) {
                val chObj = chaptersArray.getJSONObject(i)
                chapters.add(
                    Chapter(
                        title = chObj.optString("title", "Ch"),
                        chapterUrl = chObj.optString("chapterUrl", "")
                    )
                )
            }

            ArabicMangaData(
                title = obj.optString("title", "غير معروف"),
                coverUrl = obj.optString("coverUrl", ""),
                description = obj.optString("description", "لا يوجد وصف."),
                status = obj.optString("status", "Ongoing"),
                chapters = chapters,
                rating = obj.optDouble("rating", 0.0).toFloat(),
                favoritesCount = obj.optString("favoritesCount", "0"),
                type = obj.optString("type", "مانجا"),
                lastUpdated = obj.optString("lastUpdated", ""),
                headers = this@JsMangaSource.headers
            )
        } catch (e: Throwable) {
            ArabicMangaData("خطأ المحرك", "", e.message ?: "", "Error", emptyList(), 0f, "0", "مانجا", "", headers = this@JsMangaSource.headers)
        } finally {
            quickJS?.destroy()
        }
    }

    private fun parseMangaListJson(jsonString: String): List<Manga> {
        val list = mutableListOf<Manga>()
        try {
            val jsonArray = JSONArray(jsonString)
            for (i in 0 until jsonArray.length()) {
                val item = jsonArray.getJSONObject(i)
                // 🚀 رجعنا الـ Named Arguments عشان ما تنقلب البيانات!
                list.add(
                    Manga(
                        title = item.optString("title", "Unknown"),
                        coverUrl = item.optString("coverUrl", ""),
                        mangaUrl = item.optString("mangaUrl", ""),
                        sourceName = this.name,
                        headers = this.headers
                    )
                )
            }
        } catch (e: Exception) {
            Log.e("JsMangaSource", "Parse Error: ${e.message}")
        }
        return list
    }

    override suspend fun getChapterText(chapterUrl: String): List<String> { TODO("لاحقاً للرويات") }

    // 🚀 دالة جلب صفحات الفصل النظيفة (بدون البروكسي المسبب للبطء)
    override suspend fun getChapterPages(chapterUrl: String): List<String> = withContext(Dispatchers.IO) {
        var quickJS: QuickJSContext? = null
        try {
            quickJS = createQuickJSAndInjectNetwork()
            quickJS.evaluate(jsScript)

            val safeUrl = "'${chapterUrl.replace("'", "\\'")}'"
            val jsonResult = quickJS.evaluate("fetchChapterPages($safeUrl);")?.toString() ?: "[]"
            
            val jsonArray = JSONArray(jsonResult)
            val pages = mutableListOf<String>()
            
            for (i in 0 until jsonArray.length()) {
                // 🎯 التعديل: نسحب الرابط الأصلي الخام مباشرة بدون تمريره لـ wsrv.nl
                val originalUrl = jsonArray.getString(i)
                pages.add(originalUrl)
            }
            pages
        } catch (e: Throwable) {
            emptyList()
        } finally {
            quickJS?.destroy()
        }
    }
}
