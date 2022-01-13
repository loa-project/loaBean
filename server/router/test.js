const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const request = require("request");
const cheerio = require("cheerio");
 
scrapingResult = {
    'date': '',
    'the_basic_rate': '',
    'buy': '',
    'sell': ''
}
 
async function getData(userName) {
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
        console.log(scrapingResult+"!?");
        return scrapingResult;
    });
}

router.get("/", (req,res) => {
    res.send({test : "hi"});
});

//*****************
//getData를 응용해서 getUserList로 받아온 search정보로 크롤링 할 예정!!
router.post("/getUserList", async(req,res) => {
    var userInfo;
    try {
        getData(req.body.search).then((resp) => {
            console.log(resp+"!@!#");
        });
    }
    catch {
        res.json({ message: false });
    }
    res.json({ message: true });
});
module.exports = router;