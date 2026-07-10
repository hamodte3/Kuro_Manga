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

    var linkRegex = /<a[^>]+href=["'](\/series\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    var match;

    while ((match = linkRegex.exec(html)) !== null) {
        var link = match[1];
        var innerHtml = match[2];

        if (link.includes("/chapter-") || link.includes("/chapter/")) {
            continue;
        }

        var mangaUrl = "https://azorafly.com" + link;

        var coverMatch = /<img[^>]+(?:src|data-src)=["']([^"']+)["']/i.exec(innerHtml);
        if (!coverMatch) {
            continue;
        }
        
        var coverUrl = coverMatch[1];
        if (coverUrl.startsWith("/")) coverUrl = "https://azorafly.com" + coverUrl;

        var title = "Unknown";
        var altMatch = /alt=["']([^"']+)["']/i.exec(coverMatch[0]);
        if (altMatch && altMatch[1] && !altMatch[1].includes("صورة") && !altMatch[1].includes("cover")) {
            title = altMatch[1];
        } else {
            var textMatch = /class=["'][^"']*line-clamp[^"']*["'][^>]*>([\s\S]*?)<\//i.exec(innerHtml);
            if (textMatch) {
                title = textMatch[1];
            }
        }

        title = decodeHTML(cleanHtml(title));
        if (title === "الحالة" || title === "مانهوا" || title === "" || title === "Unknown" || title.includes("الفصل")) {
            continue;
        }

        var exists = false;
        for (var k = 0; k < list.length; k++) {
            if (list[k].mangaUrl === mangaUrl) {
                exists = true;
                break;
            }
        }
        
        if (!exists) {
            list.push({ title: title, coverUrl: coverUrl, mangaUrl: mangaUrl });
        }
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
    var chunks = html.split('<a ');
    for (var i = 1; i < chunks.length; i++) {
        var chunk = chunks[i];
        var hrefMatch = /href=["'](\/series\/[^"']+\/chapter-[^"']+)["']/i.exec(chunk);
        if (hrefMatch) {
            var link = "https://azorafly.com" + hrefMatch[1];
            var spanMatch = /<span[^>]*font-medium[^>]*>([\s\S]*?)<\/span>/i.exec(chunk);
            var text = "الفصل";
            if (spanMatch) {
                text = spanMatch[1].replace(//g, "").replace(/(<([^>]+)>)/gi, "").trim();
            }
            
            var exists = false;
            for (var j = 0; j < chapters.length; j++) {
                if (chapters[j].chapterUrl === link) {
                    exists = true;
                    break;
                }
            }
            
            if (!exists) {
                chapters.push({ title: text, chapterUrl: link });
            }
        }
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
    var chunks = html.split('<img ');
    for (var i = 1; i < chunks.length; i++) {
        var chunk = chunks[i];
        if (chunk.includes("data-reader-page-image")) {
            var srcMatch = /src=["']([^"']+)["']/i.exec(chunk);
            if (srcMatch) {
                pages.push(srcMatch[1]);
            }
        }
    }
    return JSON.stringify(pages);
}
