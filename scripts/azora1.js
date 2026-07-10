// خدعة التمويه لمحرك Rhino
var c_start = "<" + "!--";
var c_end = "--" + ">";

function decodeHTML(text) {
    if (!text) return "";
    return text.replace(/&#([0-9]{1,4});/gi, function(m, n) { return String.fromCharCode(parseInt(n, 10)); })
               .replace(/&#x([a-f0-9]+);/gi, function(m, h) { return String.fromCharCode(parseInt(h, 16)); })
               .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

function cleanHtml(text) {
    if (!text) return "";
    text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
    text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    var commentRegex = new RegExp(c_start + "[\\s\\S]*?" + c_end, "g");
    text = text.replace(commentRegex, "");
    return text.replace(/(<([^>]+)>)/gi, "").trim();
}

function fetchLatestManga(page, query) {
    var list = [];
    var url = "https://azorafly.com/series";
    if (query) { 
        url = "https://azorafly.com/series?searchTerm=" + encodeURIComponent(query); 
    } else if (page === 1) {
        url = "https://azorafly.com/series";
    } else { 
        url = "https://azorafly.com/series?page=" + page; 
    }
    
    var html = KuroNet.getHtml(url);
    if (!html) return "[]";
    
    var cards = html.split('class="relative h-full');
    for (var i = 1; i < cards.length; i++) {
        var card = cards[i];
        
        var linkMatch = /href=["'](\/series\/[^"']+)["']/i.exec(card);
        if (!linkMatch) continue;
        var link = linkMatch[1];
        if (link.indexOf("/chapter-") !== -1 || link.indexOf("/chapter/") !== -1) continue;
        
        var mangaUrl = "https://azorafly.com" + link;
        
        var coverMatch = /<img[^>]+(?:src|data-src)=["']([^"']+)["']/i.exec(card);
        if (!coverMatch) continue;
        var coverUrl = coverMatch[1];
        if (coverUrl.indexOf("/") === 0) coverUrl = "https://azorafly.com" + coverUrl;
        
        var title = "Unknown";
        var titleMatch = /class=["'][^"']*line-clamp[^"']*["'][^>]*>([\s\S]*?)<\//i.exec(card) || /alt=["']([^"']+)["']/i.exec(card);
        if (titleMatch) title = titleMatch[1];
        
        title = decodeHTML(cleanHtml(title));
        if (title === "الحالة" || title === "النوع" || title === "مانهوا" || title === "" || title.indexOf("الفصل") !== -1) continue;
        
        var exists = false;
        for (var k = 0; k < list.length; k++) {
            if (list[k].mangaUrl === mangaUrl) { exists = true; break; }
        }
        if (!exists) list.push({title: title, coverUrl: coverUrl, mangaUrl: mangaUrl});
    }
    return JSON.stringify(list);
}

function fetchMangaDetails(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "{}";
    
    var slug = url.split("/").pop().split("?")[0];
    
    var titleMatch = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
    var title = titleMatch ? decodeHTML(cleanHtml(titleMatch[1])) : "غير معروف";
    if (title === "الحالة" || title === "النوع") title = "غير معروف";
    
    var coverMatch = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(html) || /<img[^>]+class=["'][^"']*object-cover[^"']*["'][^>]+src=["']([^"']+)["']/i.exec(html);
    var coverUrl = coverMatch ? coverMatch[1] : "";
    if (coverUrl.indexOf("/") === 0) coverUrl = "https://azorafly.com" + coverUrl;
    
    // 🚀 التعديل الجراحي: التركيز على الحاوية التي تحتوي فعلياً على النص الطويل للوصف
    var desc = "لا يوجد وصف.";
    // نبحث عن النص الذي يبدأ بكلمات مفتاحية للوصف
    var descMatch = /<div[^>]+class=["'][^"']*description[^"']*["'][^>]*>([\s\S]*?)<\/div>/i.exec(html) || 
                    /<div[^>]+itemprop=["']description["'][^>]*>([\s\S]*?)<\/div>/i.exec(html);
    
    if (descMatch) {
        desc = decodeHTML(cleanHtml(descMatch[1]));
    } else {
        // إذا فشل، نحاول تنظيف ما تبقى من HTML
        var metaDesc = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.exec(html);
        if (metaDesc) desc = decodeHTML(metaDesc[1]);
    }
    
    // تنظيف إضافي لإزالة بقايا الأزرار والقوائم التي قد تتسرب
    desc = desc.replace(/تحديث:.*$/i, "").replace(/الرئيسية.*$/i, "").trim();

    // بقية الكود كما هو تماماً...
    var ratingMatch = /itemprop=["']ratingValue["']\s+content=["']([^"']+)["']/i.exec(html) || /ratingValue["'][:\s]*["']?([0-9.]+)/i.exec(html);
    var rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0.0;
    
    var favMatch = /<span[^>]*>([0-9.]+[kKmM]?)<\/span>\s*<small[^>]*>المفضلة<\/small>/i.exec(html) || /([0-9]+)\s*متابع/i.exec(html);
    var favorites = favMatch ? favMatch[1].toUpperCase() : "0";
    
    var type = "مانجا";
    if (html.indexOf("مانهوا") !== -1) type = "مانهوا";
    else if (html.indexOf("مانها") !== -1) type = "مانها";
    else if (html.indexOf("رواية") !== -1) type = "رواية";
    
    var updateMatch = /<p[^>]*>([\s\S]*?منذ[\s\S]*?)<\/p>/i.exec(html);
    var lastUpdated = updateMatch ? cleanHtml(updateMatch[1]) : "غير معروف";
    
    // حساب الفصول... (نفس الكود السابق)
    var totalChapters = 0;
    var totalChaptersMatch = /<p[^>]*class=["'][^"']*font-normal\s+text-xs[^"']*["'][^>]*>([0-9]+)[^\d<]*<\/p>/gi;
    var chMatch;
    while ((chMatch = totalChaptersMatch.exec(html)) !== null) {
        if (chMatch[0].indexOf("منذ") === -1) {
            totalChapters = parseInt(chMatch[1], 10);
            break;
        }
    }
    
    var chapters = [];
    if (totalChapters > 0) {
        for (var i = totalChapters; i >= 1; i--) {
            chapters.push({ title: i.toString(), chapterUrl: "https://azorafly.com/series/" + slug + "/chapter-" + i });
        }
    }
    
    return JSON.stringify({
        title: title, coverUrl: coverUrl, description: desc, status: "Ongoing",
        chapters: chapters, rating: rating, favoritesCount: favorites,
        type: type, lastUpdated: lastUpdated
    });
}


function fetchChapterPages(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "[]";
    
    var pages = [];
    var imgRegex = /<img[^>]+(?:data-reader-page-image|src|data-src)=["']([^"']+)["']/gi;
    var match;
    while ((match = imgRegex.exec(html)) !== null) {
        var src = match[1];
        if (src.indexOf("http") === -1) src = "https://azorafly.com" + src;
        
        if (src.indexOf("storage.azorafly.com") !== -1 || src.indexOf("/upload/series/") !== -1 || src.indexOf("page-") !== -1) {
            if (!/logo|avatar|user|profile|icon|favicon/i.test(src)) {
                var exists = false;
                for (var i = 0; i < pages.length; i++) { if (pages[i] === src) { exists = true; break; } }
                if (!exists) pages.push(src);
            }
        }
    }
    return JSON.stringify(pages);
}

function fetchChapterText(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "[]";
    
    var paragraphs = [];
    var novelBlockMatch = /class=["'][^"']*novel-reader-content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i.exec(html) || /itemprop=["']articleBody["'][^>]*>([\s\S]*?)<\/section>/i.exec(html);
    
    if (novelBlockMatch) {
        var block = novelBlockMatch[1];
        var pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
        var pMatch;
        while ((pMatch = pRegex.exec(block)) !== null) {
            var txt = cleanHtml(pMatch[1]);
            if (txt.length > 0 && txt !== " " && txt.indexOf("Azora") === -1) {
                paragraphs.push(decodeHTML(txt));
            }
        }
    }
    return JSON.stringify(paragraphs);
}
