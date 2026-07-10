for(var i=1;i<chunks.length;i++){
    var chunk=chunks[i];
    var hrefMatch=/href=["'](\/series\/[^"']+\/chapter-[^"']+)["']/i.exec(chunk);
    if(hrefMatch){
        var link="[https://azorafly.com](https://azorafly.com)"+hrefMatch[1];
        var spanMatch=/<span[^>]*font-medium[^>]*>([\s\S]*?)<\/span>/i.exec(chunk);
        var text="الفصل";
        if(spanMatch){
            text=spanMatch[1].replace(commentRegex,"").replace(/(<([^>]+)>)/gi,"").trim();
        }
        var exists=false;
        for(var j=0;j<chapters.length;j++){if(chapters[j].chapterUrl===link){exists=true;break}}
        if(!exists)chapters.push({title:text,chapterUrl:link});
    }
}
return JSON.stringify({title:title,coverUrl:coverUrl,description:desc,status:"Ongoing",chapters:chapters});

}

function fetchChapterPages(url){
var html=KuroNet.getHtml(url);
if(!html)return"[]";
var pages=[];
var chunks=html.split('<img ');
for(var i=1;i<chunks.length;i++){
var chunk=chunks[i];
if(chunk.includes("data-reader-page-image")){
var srcMatch=/src="'["']/i.exec(chunk);
if(srcMatch)pages.push(srcMatch[1]);
}
}
return JSON.stringify(pages);
}
