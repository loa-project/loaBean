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
                itemlevel = String($(element).text());
                if(itemlevel[0] === 'L') scrapingResult['itemlevel'] = itemlevel;
            });
            $(".level-info__expedition span").map(function (i, element) {
                ulevel = String($(element).text());
                if(ulevel[0] === 'L') scrapingResult['ulevel'] = ulevel;
            });
            $(".level-info__item span").map(function (i, element) {
                flevel = String($(element).text());
                if(flevel[0] === 'L') scrapingResult['flevel'] = flevel;
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
            console.log("검색 결과가 정상?: " + resp['flevel']);
            res.json({ userInfo: resp });
        });
    }
    catch {
        res.json({ userInfo: false });
    }
});
module.exports = router;