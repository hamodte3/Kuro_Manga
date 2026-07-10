function replaceAll(str, find, replace) {
    if(!str) return "";
    return str.split(find).join(replace);
}

function decodeHTML(text){
    if(!text) return "";
    text = replaceAll(text, "&amp;", "&");
    text = replaceAll(text, "&lt;", "<");
    text = replaceAll(text, "&gt;", ">");
    text = replaceAll(text, "&quot;", '"');
    text = replaceAll(text, "&#39;", "'");
    text = replaceAll(text, "&apos;", "'");
    return text;
}

function cleanHtml(text){
    if(!text) return "";
    var res = "";
    var inTag = false;
    for(var i=0; i<text.length; i++){
        if(text[i] === '<') inTag = true;
        else if(text[i] === '>') inTag = false;
        else if(!inTag) res += text[i];
    }
    return res.trim();
}

function fetchLatestManga(page, query){
    var list = [];
    var url = "https://azorafly.com/series";
    if(query) url += "?searchTerm=" + encodeURIComponent(query);
    else if(page > 1) url += "?page=" + page;
    
    var html = KuroNet.getHtml(url);
    if(!html) return "[]";
    
    var cards = html.split('class="relative h-full');
    for(var i=1; i<cards.length; i++){
        var card = cards[i];
        
        var hrefStart = card.indexOf('href="');
        var quote = '"';
        if(hrefStart === -1) { hrefStart = card.indexOf("href='"); quote = "'"; }
        if(hrefStart === -1) continue;
        
        var hrefEnd = card.indexOf(quote, hrefStart + 6);
        var link = card.substring(hrefStart + 6, hrefEnd);
        
        if(link.indexOf("/chapter-") !== -1 || link.indexOf("/chapter/") !== -1) continue;
        if(link.indexOf("/series/") === -1) continue;
        
        var mangaUrl = "https://azorafly.com" + link.replace("https://azorafly.com", "");
        
        var imgTagStart = card.indexOf('<img');
        if(imgTagStart === -1) continue;
        var srcStart = card.indexOf('src="', imgTagStart);
        var srcQuote = '"';
        if(srcStart === -1) { srcStart = card.indexOf("data-src=\"", imgTagStart); srcQuote = '"'; }
        if(srcStart === -1) { srcStart = card.indexOf("src='", imgTagStart); srcQuote = "'"; }
        if(srcStart === -1) continue;
        
        var srcOffset = card.indexOf("=", srcStart) + 2;
        var srcEnd = card.indexOf(srcQuote, srcOffset);
        var coverUrl = card.substring(srcOffset, srcEnd);
        if(coverUrl.indexOf("/") === 0) coverUrl = "https://azorafly.com" + coverUrl;
        
        var title = "Unknown";
        var altStart = card.indexOf('alt="', imgTagStart);
        var altQuote = '"';
        if(altStart === -1) { altStart = card.indexOf("alt='", imgTagStart); altQuote = "'"; }
        
        if(altStart !== -1 && altStart < srcEnd + 100) {
            var altEnd = card.indexOf(altQuote, altStart + 5);
            var altText = card.substring(altStart + 5, altEnd);
            if(altText.indexOf("صورة") === -1 && altText.indexOf("cover") === -1){
                title = altText;
            }
        }
        
        if(title === "Unknown"){
            var titleBlockStart = card.indexOf('line-clamp');
            if(titleBlockStart !== -1){
                var titleTagClose = card.indexOf('>', titleBlockStart);
                var titleEnd = card.indexOf('</', titleTagClose);
                if(titleTagClose !== -1 && titleEnd !== -1){
                    title = card.substring(titleTagClose + 1, titleEnd);
                }
            }
        }
        
        title = cleanHtml(title);
        title = decodeHTML(title);
        if(title === "الحالة" || title === "مانهوا" || title === "" || title.indexOf("الفصل") !== -1) continue;
        
        var exists = false;
        for(var k=0; k<list.length; k++){ if(list[k].mangaUrl === mangaUrl) { exists=true; break; } }
        if(!exists) list.push({title: title, coverUrl: coverUrl, mangaUrl: mangaUrl});
    }
    return JSON.stringify(list);
}

function fetchMangaDetails(url){
    var html = KuroNet.getHtml(url);
    if(!html) return "{}";
    
    var title = "Unknown";
    var h1Start = html.indexOf('<h1');
    if(h1Start !== -1){
        var h1Close = html.indexOf('>', h1Start);
        var h1End = html.indexOf('</h1>', h1Close);
        if(h1Close !== -1 && h1End !== -1) title = decodeHTML(cleanHtml(html.substring(h1Close + 1, h1End)));
    }
    
    var coverUrl = "";
    var ogStart = html.indexOf('property="og:image"');
    if(ogStart !== -1){
        var contentStart = html.indexOf('content="', ogStart);
        if(contentStart !== -1){
            var contentEnd = html.indexOf('"', contentStart + 9);
            coverUrl = html.substring(contentStart + 9, contentEnd);
        }
    }
    
    var desc = "لا يوجد وصف.";
    var descStart = html.indexOf('itemprop="description"');
    if(descStart !== -1){
        var descClose = html.indexOf('>', descStart);
        var descEnd = html.indexOf('</div>', descClose);
        if(descEnd === -1) descEnd = html.indexOf('</p>', descClose);
        if(descClose !== -1 && descEnd !== -1) desc = decodeHTML(cleanHtml(html.substring(descClose + 1, descEnd)));
    }
    
    var chapters = [];
    var chunks = html.split('<a ');
    
    // 🚀 خدعة التمويه: كسرنا الكلمة عشان المحرك ما يحسبها تعليق
    var cStartTag = "<" + "!--";
    var cEndTag = "--" + ">";
    
    for(var i=1; i<chunks.length; i++){
        var chunk = chunks[i];
        
        var hrefStart = chunk.indexOf('href="');
        var quote = '"';
        if(hrefStart === -1) { hrefStart = chunk.indexOf("href='"); quote = "'"; }
        if(hrefStart === -1) continue;
        
        var hrefEnd = chunk.indexOf(quote, hrefStart + 6);
        var linkPart = chunk.substring(hrefStart + 6, hrefEnd);
        
        if(linkPart.indexOf("/series/") !== -1 && linkPart.indexOf("/chapter-") !== -1){
            var link = "https://azorafly.com" + linkPart.replace("https://azorafly.com", "");
            
            var text = "الفصل";
            var spanStart = chunk.indexOf('font-medium');
            if(spanStart !== -1){
                var spanClose = chunk.indexOf('>', spanStart);
                var spanEnd = chunk.indexOf('</', spanClose);
                if(spanClose !== -1 && spanEnd !== -1){
                    var rawText = chunk.substring(spanClose + 1, spanEnd);
                    while(rawText.indexOf(cStartTag) !== -1){
                        var cStart = rawText.indexOf(cStartTag);
                        var cEnd = rawText.indexOf(cEndTag, cStart);
                        if(cEnd !== -1) {
                            rawText = rawText.substring(0, cStart) + rawText.substring(cEnd + 3);
                        } else {
                            break;
                        }
                    }
                    text = cleanHtml(rawText);
                }
            }
            
            var exists = false;
            for(var j=0; j<chapters.length; j++){ if(chapters[j].chapterUrl === link){ exists=true; break; } }
            if(!exists) chapters.push({title: text, chapterUrl: link});
        }
    }
    return JSON.stringify({title: title, coverUrl: coverUrl, description: desc, status: "Ongoing", chapters: chapters});
}

function fetchChapterPages(url){
    var html = KuroNet.getHtml(url);
    if(!html) return "[]";
    
    var pages = [];
    var chunks = html.split('<img ');
    for(var i=1; i<chunks.length; i++){
        var chunk = chunks[i];
        if(chunk.indexOf("data-reader-page-image") !== -1){
            var srcStart = chunk.indexOf('src="');
            var quote = '"';
            if(srcStart === -1){ srcStart = chunk.indexOf("src='"); quote = "'"; }
            if(srcStart !== -1){
                var srcEnd = chunk.indexOf(quote, srcStart + 5);
                pages.push(chunk.substring(srcStart + 5, srcEnd));
            }
        }
    }
    return JSON.stringify(pages);
}
