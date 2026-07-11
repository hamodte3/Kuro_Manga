// استدعاء مكتبة Jsoup من داخل تطبيق الأندرويد مباشرة عبر Rhino!
var Jsoup = org.jsoup.Jsoup;

function fetchLatestManga(page, query) {
    var url = "https://azorafly.com/series";
    if (query) {
        url += "?searchTerm=" + encodeURIComponent(query);
    } else if (page === 1) {
        url = "https://azorafly.com/series";
    } else {
        url += "?page=" + page;
    }

    var html = KuroNet.getHtml(url);
    if (!html) return "[]";

    // تحويل النص إلى Jsoup Document
    var doc = Jsoup.parse(html, "https://azorafly.com");
    var list = [];
    var map = {};

    var containers = doc.select("div:has(a.text-foreground[href^='/series/'])");
    for (var i = 0; i < containers.size(); i++) {
        var container = containers.get(i);
        var link = container.selectFirst("a.text-foreground[href^='/series/']:not([href*='/chapter-'])");
        if (!link) continue;

        var title = link.text().trim();
        if (title === "الحالة" || title === "مانهوا") continue;

        var img = container.selectFirst("img.object-cover");
        var coverUrl = img ? (img.attr("abs:src") || img.attr("src")) : "";
        var mangaUrl = link.attr("abs:href") || ("https://azorafly.com" + link.attr("href"));

        if (!map[mangaUrl]) {
            map[mangaUrl] = true;
            list.push({ title: title, coverUrl: coverUrl, mangaUrl: mangaUrl });
        }
    }
    return JSON.stringify(list);
}

function fetchMangaDetails(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "{}";

    var doc = Jsoup.parse(html, url);
    var slug = url.substring(url.lastIndexOf("/") + 1).split("?")[0];

    // العنوان
    var title = "غير معروف";
    var h1s = doc.select("h1");
    for (var i = 0; i < h1s.size(); i++) {
        var text = h1s.get(i).text().trim();
        if (text !== "الحالة" && text !== "النوع") {
            title = text; break;
        }
    }

    // الغلاف
    var coverImg = doc.selectFirst("meta[property=og:image]");
    var coverUrl = coverImg ? coverImg.attr("content").trim() : "";
    if (!coverUrl) {
        var img2 = doc.selectFirst("div.relative.w-full.h-full img.object-cover, img.object-cover") || doc.select("img").first();
        if (img2) coverUrl = img2.attr("abs:src") || img2.attr("src");
    }

    // الوصف
    var descElem = doc.selectFirst("div[itemprop='description']");
    var description = descElem ? descElem.text().trim() : "لا يوجد وصف.";

    // التقييم
    var ratingMeta = doc.selectFirst("meta[itemprop=ratingValue]");
    var rating = ratingMeta ? parseFloat(ratingMeta.attr("content")) : 0.0;
    if (isNaN(rating)) rating = 0.0;

    // المفضلات
    var favSmall = doc.select("small:contains(المفضلة)");
    var favoritesCount = "0";
    if (favSmall.size() > 0) {
        var prevSpan = favSmall.first().previousElementSibling();
        if (prevSpan) favoritesCount = prevSpan.text().trim();
    }

    // النوع
    var typeElem = doc.select("span.border");
    var type = "مانجا";
    for (var k = 0; k < typeElem.size(); k++) {
        var tText = typeElem.get(k).text();
        if (/مانجا|مانهوا|رواية|مانها/.test(tText)) {
            type = tText.trim(); break;
        }
    }

    // آخر تحديث
    var updatedElem = doc.select("p:contains(منذ)").first();
    var lastUpdated = updatedElem ? updatedElem.text().trim() : "غير معروف";

    // الفصول
    var totalChapters = 0;
    var chElements = doc.select("div.inline p.font-normal.text-xs.inline.ml-1.text-foreground");
    for (var c = 0; c < chElements.size(); c++) {
        var cText = chElements.get(c).text();
        if (cText.indexOf("منذ") === -1) {
            var numStr = cText.replace(/[^0-9]/g, "");
            if (numStr) totalChapters = parseInt(numStr, 10);
            break;
        }
    }

    if (totalChapters === 0) {
        var fallbackLink = doc.selectFirst("a[href*='/chapter-']");
        if (fallbackLink) {
            var href = fallbackLink.attr("href");
            var chStr = href.substring(href.lastIndexOf("chapter-") + 8).split("-")[0].split(".")[0];
            var chNumStr = chStr.replace(/[^0-9]/g, "");
            if (chNumStr) totalChapters = parseInt(chNumStr, 10);
        }
    }

    var chapters = [];
    if (totalChapters > 0) {
        for (var i = totalChapters; i >= 1; i--) {
            chapters.push({
                title: i.toString(),
                chapterUrl: "https://azorafly.com/series/" + slug + "/chapter-" + i
            });
        }
    }

    if (chapters.length === 0) {
        var links = doc.select("a[href*='/chapter-'], a[href*='chapter']");
        var mapCh = {};
        for (var j = 0; j < links.size(); j++) {
            var el = links.get(j);
            var chUrl = el.attr("abs:href") || ("https://azorafly.com" + el.attr("href"));

            var chTitleElem = el.selectFirst("span.font-medium, span.text-xs.sm\\:text-sm.font-medium");
            var chTitle = chTitleElem ? chTitleElem.text().trim() : "";
            if (chTitle === "") {
                chTitle = el.text().split("جديد")[0].split("منذ")[0].split("يوم")[0].split("ساعة")[0].split("دقيقة")[0].trim();
            }
            chTitle = chTitle.replace(/(الفصل|Chapter|Ch\.?\s*)/ig, "").trim();
            if (chTitle === "") chTitle = (j + 1).toString();

            if (chUrl && !mapCh[chUrl]) {
                mapCh[chUrl] = true;
                chapters.push({ title: chTitle, chapterUrl: chUrl });
            }
        }
    }

    return JSON.stringify({
        title: title,
        coverUrl: coverUrl,
        description: description,
        status: "Ongoing",
        chapters: chapters,
        rating: rating,
        favoritesCount: favoritesCount,
        type: type,
        lastUpdated: lastUpdated
    });
}

function fetchChapterPages(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "[]";

    var doc = Jsoup.parse(html, url);
    var list = [];
    var map = {};

    var processImg = function(src) {
        if (src && src.trim() !== "" && !map[src]) {
            map[src] = true;
            list.push(src.trim());
        }
    };

    var imgs1 = doc.select("img[data-reader-page-image]");
    for (var i = 0; i < imgs1.size(); i++) {
        var img1 = imgs1.get(i);
        processImg(img1.attr("abs:src") || img1.attr("src") || img1.attr("data-src"));
    }

    if (list.length === 0) {
        var imgs2 = doc.select("img.object-contain, img[alt*='Page'], img[alt*='الفصل']");
        for (var j = 0; j < imgs2.size(); j++) {
            var img2 = imgs2.get(j);
            var src2 = img2.attr("abs:src") || img2.attr("src");
            if (src2 && (src2.indexOf("storage.azorafly.com") !== -1 || src2.indexOf("/upload/series/") !== -1)) {
                processImg(src2);
            }
        }
    }

    if (list.length === 0) {
        var imgs3 = doc.select("img");
        for (var k = 0; k < imgs3.size(); k++) {
            var img3 = imgs3.get(k);
            var src3 = img3.attr("abs:src") || img3.attr("data-src") || img3.attr("src");
            if (src3 && (src3.indexOf("/upload/") !== -1 || src3.indexOf("/series/") !== -1 || src3.indexOf("page-") !== -1 || src3.indexOf("storage.azorafly") !== -1)) {
                if (!(/logo|avatar|user|profile|icon|favicon/i.test(src3))) {
                    processImg(src3);
                }
            }
        }
    }

    return JSON.stringify(list);
}

function fetchChapterText(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "[]";

    var doc = Jsoup.parse(html, url);
    var paragraphs = [];

    var pElems = doc.select("div.novel-reader-content p");
    if (pElems.size() > 0) {
        for (var i = 0; i < pElems.size(); i++) {
            var text1 = pElems.get(i).text().trim();
            if (text1 !== "" && text1 !== " " && text1.indexOf("Azora Manga") === -1) {
                paragraphs.push(text1);
            }
        }
    }

    if (paragraphs.length === 0) {
        var fallbackElems = doc.select("section[itemprop=articleBody] p, div.reading-content p");
        for (var j = 0; j < fallbackElems.size(); j++) {
            var text2 = fallbackElems.get(j).text().trim();
            if (text2 !== "") paragraphs.push(text2);
        }
    }

    return JSON.stringify(paragraphs);
}
