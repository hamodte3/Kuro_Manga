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
    var baseUrl = "https://despair-manga.net";
    var html = KuroNet.getHtml(url);
    if (!html) return "{}";
    var document = Jsoup.parse(html, baseUrl);
    
    var titleElem = document.selectFirst("h1.entry-title");
    var title = titleElem != null ? String(titleElem.text()).trim() : "";
    
    var coverElem = document.selectFirst("img.wp-post-image");
    var coverUrl = coverElem != null ? String(coverElem.attr("abs:src")) : "";
    
    var descElem = document.selectFirst("div.entry-content[itemprop=description]");
    var description = descElem != null ? String(descElem.text()).trim() : "لا يوجد وصف";
    
    var ratingElem = document.selectFirst("div.numscore");
    var rating = ratingElem != null ? parseFloat(String(ratingElem.text())) : 0.0;
    if (isNaN(rating)) rating = 0.0;
    
    var typeElem = document.select("span:contains(النوع) a");
    var type = (typeElem != null && String(typeElem.text()).trim().length > 0) ? String(typeElem.text()).trim() : "مانجا";
    
    var chaptersList = [];
    var chapterElements = document.select("div#chapterlist li");
    
    for (var i = 0; i < chapterElements.size(); i++) {
        var element = chapterElements.get(i);
        var link = element.selectFirst("a");
        if (link == null) continue;
        
        var chUrl = String(link.attr("abs:href"));
        var chNumElem = element.selectFirst("span.chapternum");
        var chTitle = chNumElem != null ? String(chNumElem.text()).trim() : String(link.text()).trim();
        
        if (chUrl.length > 0) {
            chaptersList.push({
                title: chTitle,
                chapterUrl: chUrl
            });
        }
    }
    
    return JSON.stringify({
        title: title,
        coverUrl: coverUrl,
        description: description,
        status: "Ongoing",
        chapters: chaptersList,
        rating: rating,
        favoritesCount: "0",
        type: type,
        lastUpdated: ""
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
