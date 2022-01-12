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
 
function getData() {
    request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn", function (err, res, body) {
        const $ = cheerio.load(body);
        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scrapingResult['date'] = String($(element).find('td:nth-of-type(1)').text());
            scrapingResult['the_basic_rate'] =  String($(element).find('td:nth-of-type(2)').text());
            scrapingResult['buy'] =  String($(element).find('td:nth-of-type(4)').text());
            scrapingResult['sell'] =  String($(element).find('td:nth-of-type(5)').text());
 
            console.log(scrapingResult)
        });
    });
}

router.get("/", (req,res) => {
    res.send({test : "hi"});
});

//*****************
//getData를 응용해서 getUserList로 받아온 search정보로 크롤링 할 예정!!
router.post("/getUserList", async(req,res) => {
    try {
    console.log(req.body.search);
    res.send("hi");
    }
    catch {
        res.json({ message: false });
    }
    getData();
});
module.exports = router;