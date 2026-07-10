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
    
    // ... (نفس كود العنوان والغلاف السابق)
    
    // 🚀 التعديل الذكي: استخراج رقم المفضلات كأرقام فقط (Hardcoded Logic)
    // نبحث عن أي رقم متبوع بـ K أو M أو رقم صافي قريب من كلمة "المفضلة"
    var favMatch = /([0-9.]+[kKmM]?)\s*<small[^>]*>المفضلة<\/small>/i.exec(html) || 
                   /([0-9.]+[kKmM]?)\s*متابع/i.exec(html);
    
    var favorites = "0";
    if (favMatch) {
        var rawFav = favMatch[1].toUpperCase();
        // هنا نضمن أننا نرسل الرقم كما هو أو مع تصنيفه، والتطبيق سيعرف التعامل معه
        favorites = rawFav; 
    }

    // 🚀 تنظيف الوصف: إزالة أي شيء لا يبدأ بنص إبداعي للقصة
    var desc = "لا يوجد وصف.";
    var descMatch = /<div[^>]+class=["'][^"']*description[^"']*["'][^>]*>([\s\S]*?)<\/div>/i.exec(html);
    if (descMatch) {
        var rawDesc = cleanHtml(descMatch[1]);
        // قص أي جملة تبدأ بكلمات غريبة قد تظهر قبل القصة
        desc = rawDesc.split(/(تحديث:|\. الرئيسية|\. قائمة)/i)[0].trim();
    }

    // ... (بقية كود الفصول والنوع كما هو)
    
    return JSON.stringify({
        title: title, 
        coverUrl: coverUrl, 
        description: desc, 
        status: "Ongoing", 
        chapters: chapters,
        rating: rating,
        favoritesCount: favorites,
        type: type,
        lastUpdated: lastUpdated
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
