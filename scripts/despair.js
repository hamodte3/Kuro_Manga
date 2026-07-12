function getLatestManga(page, query) {
    var baseUrl = "https://despair-manga.net";
    var url = query ? (baseUrl + "/?s=" + encodeURIComponent(query)) : (baseUrl + "/manga/?page=" + page + "&order=update");
    
    // استدعاء دالة الجلب المتوفرة في محرك التطبيق
    var document = fetchJsoupDocument(url, baseUrl);
    var elements = document.select("div.bsx");
    var list = [];
    
    for (var i = 0; i < elements.size(); i++) {
        var element = elements.get(i);
        var linkElement = element.selectFirst("a");
        
        var title = "";
        if (linkElement != null && linkElement.hasAttr("title")) {
            title = linkElement.attr("title").trim();
        } else {
            var tt = element.selectFirst(".tt");
            if (tt != null) title = tt.text().trim();
        }
        
        var mangaUrl = linkElement != null ? linkElement.attr("abs:href") : "";
        
        // تنظيف رابط الغلاف من معاملات الحجم (?resize=...)
        var rawCover = "";
        var imgElement = element.selectFirst("img");
        if (imgElement != null) rawCover = imgElement.attr("src");
        var coverUrl = String(rawCover).split("?")[0];
        
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
    var document = fetchJsoupDocument(url, baseUrl);
    
    var titleElem = document.selectFirst("h1.entry-title");
    var title = titleElem != null ? titleElem.text().trim() : "";
    
    var coverElem = document.selectFirst("img.wp-post-image");
    var coverUrl = coverElem != null ? coverElem.attr("abs:src") : "";
    
    var descElem = document.selectFirst("div.entry-content[itemprop=description]");
    var description = descElem != null ? descElem.text().trim() : "";
    
    var ratingElem = document.selectFirst("div.numscore");
    var rating = ratingElem != null ? parseFloat(ratingElem.text()) : 0.0;
    if (isNaN(rating)) rating = 0.0;
    
    var typeElem = document.select("span:contains(النوع) a");
    var type = (typeElem != null && typeElem.text().trim().length > 0) ? typeElem.text().trim() : "مانجا";
    
    var chaptersList = [];
    var chapterElements = document.select("div#chapterlist li");
    
    for (var i = 0; i < chapterElements.size(); i++) {
        var element = chapterElements.get(i);
        var link = element.selectFirst("a");
        if (link == null) continue;
        
        var chUrl = link.attr("abs:href");
        var chNumElem = element.selectFirst("span.chapternum");
        var chTitle = chNumElem != null ? chNumElem.text().trim() : link.text().trim();
        
        if (chUrl.length > 0) {
            chaptersList.push({
                title: chTitle,
                chapterUrl: chUrl
            });
        }
    }
    
    var details = {
        title: title,
        coverUrl: coverUrl,
        description: description,
        status: "Ongoing",
        chapters: chaptersList,
        rating: rating,
        favoritesCount: "0",
        type: type,
        lastUpdated: ""
    };
    
    return JSON.stringify(details);
}

function getChapterPages(chapterUrl) {
    var baseUrl = "https://despair-manga.net";
    var document = fetchJsoupDocument(chapterUrl, chapterUrl);
    var pages = [];
    var html = document.html();
    
    // 1. الاستراتيجية الأولى: استخراج JSON المخفي في السكربت
    if (html.indexOf("ts_reader.run({") !== -1) {
        try {
            var jsonString = html.split("ts_reader.run(")[1].split(");</script>")[0];
            var jsonData = JSON.parse(jsonString);
            var sources = jsonData.sources;
            
            if (sources && sources.length > 0) {
                var imagesArray = sources[0].images;
                for (var i = 0; i < imagesArray.length; i++) {
                    var imgUrl = imagesArray[i].replace(/\\\//g, "/"); // إصلاح السلاش
                    
                    if (imgUrl.startsWith("/")) {
                        imgUrl = baseUrl + imgUrl;
                    } else if (!imgUrl.startsWith("http")) {
                        imgUrl = baseUrl + "/" + imgUrl;
                    }
                    pages.push(imgUrl);
                }
            }
        } catch (e) {
            // تجاهل الخطأ والانتقال للاستراتيجية البديلة
        }
    }
    
    // 2. الاستراتيجية البديلة: قراءة الـ DOM المباشر
    if (pages.length === 0) {
        try {
            var imageElements = document.select("div#readerarea img");
            for (var j = 0; j < imageElements.size(); j++) {
                var img = imageElements.get(j);
                var url = img.attr("data-src").trim();
                if (url === "") url = img.attr("data-lazy-src").trim();
                if (url === "") url = img.attr("src").trim();
                
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
    
    // إزالة التكرارات إن وجدت
    var uniquePages = [];
    for (var k = 0; k < pages.length; k++) {
        if (uniquePages.indexOf(pages[k]) === -1) {
            uniquePages.push(pages[k]);
        }
    }
    
    return JSON.stringify(uniquePages);
}
