const https = require('https');

const cheerio = require('cheerio');

const fs = require('fs');

https.get('https://movie.douban.com/subject/1292052/',function(res){
    let html = '';
    res.on('data', function(datas){
        html += datas
    })

    res.on('end', function(){
        // console.log(html);
        const $ = cheerio.load(html);
        let allFiles =[]

        $('.review-list>div').each(function(){
            const authorImg =  $('.avator>img',this).attr('src');
            const authorName = $('.name',this).text();
            const time = $('.main-meta',this).text();
            const textName = $('.main-bd>h2>a',this).text();
            const textContent = $('.short-content',this).text();
            allFiles.push({authorImg, authorName,time, textName, textContent});
        })

        fs.writeFile('./node/pa/file.json',JSON.stringify(allFiles),function(err){
            if (!err) {
                console.log("爬虫完毕");
            }
        })
    })
})