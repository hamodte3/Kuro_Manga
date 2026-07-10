function decodeHTML(text) {
    if (!text) return "";
    return text.replace(/&#([0-9]{1,4});/gi, function(m, num) { return String.fromCharCode(parseInt(num, 10)); })
               .replace(/&#x([a-f0-9]+);/gi, function(m, hex) { return String.fromCharCode(parseInt(hex, 16)); })
               .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

function cleanHtml(text) {
    return text.replace(/(<([^>]+)>)/gi, "").trim();
}

function fetchLatestManga(page, query) {
    var list = [];
    var url = "https://azorafly.com/series";
    if (query) { url = "https://azorafly.com/series?searchTerm=" + encodeURIComponent(query); }
    else if (page > 1) { url = "https://azorafly.com/series?page=" + page; }

    var html = KuroNet.getHtml(url);
    if (!html) return "[]";

    var cards = html.split('class="relative h-full p-1 sm:p-2');
    for (var i = 1; i < cards.length; i++) {
        var card = cards[i];
        
        var linkMatch = /<a[^>]+href=["'](\/series\/[^"']+)["']/i.exec(card);
        if (!linkMatch) continue;
        var mangaUrl = "https://azorafly.com" + linkMatch[1];
        
        var titleMatch = /class=["'][^"']*line-clamp-2[^"']*["'][^>]*>([\s\S]*?)<\/a>/i.exec(card);
        var title = titleMatch ? decodeHTML(cleanHtml(titleMatch[1])) : "Unknown";
        if (title === "الحالة" || title === "مانهوا" || title === "" || title === "Unknown") continue;
        
        var coverMatch = /<img[^>]+(?:src|data-src)=["']([^"']+)["']/i.exec(card);
        var coverUrl = coverMatch ? coverMatch[1] : "";
        if (coverUrl.startsWith("/")) coverUrl = "https://azorafly.com" + coverUrl;
        
        list.push({ title: title, coverUrl: coverUrl, mangaUrl: mangaUrl });
    }
    return JSON.stringify(list);
}

function fetchMangaDetails(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "{}";

    var titleMatch = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
    var title = titleMatch ? decodeHTML(cleanHtml(titleMatch[1])) : "Unknown";
    
    var coverMatch = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(html);
    var coverUrl = coverMatch ? coverMatch[1] : "";

    var descMatch = /itemprop=["']description["'][^>]*>([\s\S]*?)<\/(?:div|p|span)>/i.exec(html);
    var desc = descMatch ? decodeHTML(cleanHtml(descMatch[1])) : "لا يوجد وصف.";
    
    var chapters = [];
    var chRegex = /href=["']([^"']+\/chapter-[^"']+)["'][^>]*>([^<]+)<\/a>/gi;
    var match;
    while ((match = chRegex.exec(html)) !== null) {
        chapters.push({ title: match[2].trim(), chapterUrl: "https://azorafly.com" + match[1] });
    }

    return JSON.stringify({ 
        title: title, 
        coverUrl: coverUrl, 
        description: desc, 
        status: "Ongoing", 
        chapters: chapters 
    });
}

function fetchChapterPages(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "[]";
    
    var pages = [];
    var imgRegex = /<img[^>]+data-reader-page-image[^>]*src=["']([^"']+)["']/gi;
    var match;
    while ((match = imgRegex.exec(html)) !== null) {
        pages.push(match[1]);
    }
    return JSON.stringify(pages);
}
