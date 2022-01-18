const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const request = require("request");
const cheerio = require("cheerio");
 
scrapingResult = {
}

let getData = function proFunc(userName) {
    scrapingResult = {};
    return new Promise((resolve, reject)=> {
        const url = "https://lostark.game.onstove.com/Profile/Character/"+encodeURIComponent(userName);
        request(url, function (err, res, body) {
            const $ = cheerio.load(String(body));
            $(".level-info2__expedition span").map(function (i, element) {
                text = String($(element).text());
                if(text[0] === 'L') scrapingResult['itemlevel'] = text;
            });
            $(".level-info__expedition span").map(function (i, element) {
                text = String($(element).text());
                if(text[0] === 'L') scrapingResult['ulevel'] = text;
            });
            $(".level-info__item span").map(function (i, element) {
                text = String($(element).text());
                if(text[0] === 'L') scrapingResult['flevel'] = text;
            });
            $(".profile-character-info__server").map(function (i, element) {
                text = String($(element).text());
                scrapingResult['server'] = text;
            });
            $(".game-info__title").map(function (i, element) {
                text = String($(element).find('span:nth-of-type(2)').text());
                scrapingResult['degree'] = text;
            });
            $(".game-info__guild").map(function (i, element) {
                text = String($(element).find('span:nth-of-type(2)').text());
                scrapingResult['guild'] = text;
            });
            $(".level-info__pvp").map(function (i, element) {
                text = String($(element).find('span:nth-of-type(2)').text());
                scrapingResult['pvp'] = text;
            });
            $(".game-info__wisdom").map(function (i, element) {
                text = String($(element).find('span:nth-of-type(2)').text());
                scrapingResult['wlevel'] = text;
            });
            $(".game-info__wisdom").map(function (i, element) {
                text = String($(element).find('span:nth-of-type(3)').text());
                scrapingResult['wisdom_name'] = text;
            });
            if(scrapingResult) resolve(scrapingResult);
            else reject("rejected");
        });
    });
}


//*****************
//getData를 응용해서 getUserList로 받아온 search정보로 크롤링 할 예정!!
router.post("/getUserList", async(req,res) => {
    try {
        getData(req.body.search).then((resp) => {
            console.log("검색 결과가 정상?: " + resp['wisdom_name']);
            res.json({ userInfo: resp });
        });
    }
    catch {
        res.json({ userInfo: false });
    }
});
module.exports = router;