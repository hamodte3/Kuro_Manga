var Jsoup = Packages.org.jsoup.Jsoup;

function getLatestManga(page, query) {
    var baseUrl = "https://despair-manga.net";
    var url = query ? (baseUrl + "/?s=" + encodeURIComponent(query)) : (baseUrl + "/manga/?page=" + page + "&order=update");
    
    var html = KuroNet.getHtml(url);
    if (!html) return "[]";
    var document = Jsoup.parse(html, baseUrl);
    
    var elements = document.select("div.bsx");
    var list = [];
    
    for (var i = 0; i < elements.size(); i++) {
        var element = elements.get(i);
        var linkElement = element.selectFirst("a");
        
        var title = "";
        if (linkElement != null && linkElement.hasAttr("title")) {
            title = String(linkElement.attr("title")).trim();
        } else {
            var tt = element.selectFirst(".tt");
            if (tt != null) title = String(tt.text()).trim();
        }
        
        var mangaUrl = linkElement != null ? String(linkElement.attr("abs:href")) : "";
        
        var rawCover = "";
        var imgElement = element.selectFirst("img");
        if (imgElement != null) rawCover = String(imgElement.attr("src"));
        
        var coverUrl = rawCover;
        if (rawCover.indexOf("?") !== -1) {
            coverUrl = rawCover.substring(0, rawCover.indexOf("?"));
        }
        
        if (title.length > 0 && mangaUrl.length > 0) {
            list.push({
                title: title,
                mangaUrl: mangaUrl,
                coverUrl: coverUrl,
                sourceName: "Despair Manga"
            });
        }
    }
    return JSON.stringify(list);
}

function getMangaDetails(url) {
    var html = KuroNet.getHtml(url);
    if (!html) return "{}";

    var doc = Jsoup.parse(html, url);
    var slugRaw = String(url).substring(String(url).lastIndexOf("/") + 1);
    var slug = slugRaw;
    if (slugRaw.indexOf("?") !== -1) {
        slug = slugRaw.substring(0, slugRaw.indexOf("?"));
    }

    var title = "غير معروف";
    var h1s = doc.select("h1");
    for (var i = 0; i < h1s.size(); i++) {
        var text = String(h1s.get(i).text()).trim();
        if (text !== "الحالة" && text !== "النوع") {
            title = text; break;
        }
    }

    var coverImg = doc.selectFirst("meta[property=og:image]");
    var coverUrl = coverImg ? String(coverImg.attr("content")).trim() : "";
    if (!coverUrl) {
        var img2 = doc.selectFirst("div.relative.w-full.h-full img.object-cover, img.object-cover") || doc.select("img").first();
        if (img2) coverUrl = String(img2.attr("abs:src") || img2.attr("src"));
    }

    var descElem = doc.selectFirst("div[itemprop='description']");
    var description = descElem ? String(descElem.text()).trim() : "لا يوجد وصف.";

    var ratingMeta = doc.selectFirst("meta[itemprop=ratingValue]");
    var rating = ratingMeta ? parseFloat(String(ratingMeta.attr("content"))) : 0.0;
    if (isNaN(rating)) rating = 0.0;

    var favSmall = doc.select("small:contains(المفضلة)");
    var favoritesCount = "0";
    if (favSmall.size() > 0) {
        var prevSpan = favSmall.first().previousElementSibling();
        if (prevSpan) favoritesCount = String(prevSpan.text()).trim();
    }

    var typeElem = doc.select("span.border");
    var type = "مانجا";
    for (var k = 0; k < typeElem.size(); k++) {
        var tText = String(typeElem.get(k).text());
        if (/مانجا|مانهوا|رواية|مانها/.test(tText)) {
            type = tText.trim(); break;
        }
    }

    var updatedElem = doc.select("p:contains(منذ)").first();
    var lastUpdated = updatedElem ? String(updatedElem.text()).trim() : "غير معروف";

    var totalChapters = 0;
    var chElements = doc.select("div.inline p.font-normal.text-xs.inline.ml-1.text-foreground");
    for (var c = 0; c < chElements.size(); c++) {
        var cText = String(chElements.get(c).text());
        if (cText.indexOf("منذ") === -1) {
            var numStr = cText.replace(/[^0-9]/g, "");
            if (numStr) totalChapters = parseInt(numStr, 10);
            break;
        }
    }

    if (totalChapters === 0) {
        var fallbackLink = doc.selectFirst("a[href*='/chapter-']");
        if (fallbackLink) {
            var href = String(fallbackLink.attr("href"));
            var chStrRaw = href.substring(href.lastIndexOf("chapter-") + 8);
            var chStr = chStrRaw;
            if (chStrRaw.indexOf("-") !== -1) chStr = chStrRaw.substring(0, chStrRaw.indexOf("-"));
            if (chStr.indexOf(".") !== -1) chStr = chStr.substring(0, chStr.indexOf("."));
            
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
            var chUrl = String(el.attr("abs:href") || ("https://azorafly.com" + el.attr("href")));

            var chTitleElem = el.selectFirst("span.font-medium, span.text-xs.sm\\:text-sm.font-medium");
            var chTitle = chTitleElem ? String(chTitleElem.text()).trim() : "";
            if (chTitle === "") {
                var rawTitle = String(el.text());
                chTitle = rawTitle.split("جديد")[0].split("منذ")[0].split("يوم")[0].split("ساعة")[0].split("دقيقة")[0].trim();
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

function getChapterPages(chapterUrl) {
    var baseUrl = "https://despair-manga.net";
    var htmlRaw = KuroNet.getHtml(chapterUrl);
    if (!htmlRaw) return "[]";
    var document = Jsoup.parse(htmlRaw, baseUrl);
    
    var pages = [];
    var html = String(document.html());
    
    if (html.indexOf("ts_reader.run({") !== -1) {
        try {
            var jsonString = html.split("ts_reader.run(")[1].split(");</script>")[0];
            var jsonData = JSON.parse(jsonString);
            var sources = jsonData.sources;
            
            if (sources && sources.length > 0) {
                var imagesArray = sources[0].images;
                for (var i = 0; i < imagesArray.length; i++) {
                    var imgUrl = String(imagesArray[i]).replace(/\\\//g, "/"); 
                    
                    if (imgUrl.startsWith("/")) {
                        imgUrl = baseUrl + imgUrl;
                    } else if (!imgUrl.startsWith("http")) {
                        imgUrl = baseUrl + "/" + imgUrl;
                    }
                    pages.push(imgUrl);
                }
            }
        } catch (e) {}
    }
    
    if (pages.length === 0) {
        try {
            var imageElements = document.select("div#readerarea img");
            for (var j = 0; j < imageElements.size(); j++) {
                var img = imageElements.get(j);
                var url = String(img.attr("data-src")).trim();
                if (url === "") url = String(img.attr("data-lazy-src")).trim();
                if (url === "") url = String(img.attr("src")).trim();
                
                if (url !== "" && url.indexOf("readerarea.svg") === -1 && url.indexOf("data:image") === -1) {
                    if (url.startsWith("/")) {
                        url = baseUrl + url;
                    } else if (!url.startsWith("http")) {
                        url = baseUrl + "/" + url;
                    }
                    pages.push(url);
                }
            }
        } catch (e) {}
    }
    
    var uniquePages = [];
    for (var k = 0; k < pages.length; k++) {
        if (uniquePages.indexOf(pages[k]) === -1) {
            uniquePages.push(pages[k]);
        }
    }
    
    return JSON.stringify(uniquePages);
}
