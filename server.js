const express = require('express')
const app = express()
const port = process.env.PORT || 80
fs = require('fs')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Lab1.html")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/saveTabs', urlencodedParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    const content = "title=" + req.body.title
        + ";content=" + req.body.content + ";"
        + ";html=" + req.body.html + ";";

    fs.writeFile('tabs.txt', content, function (err) {
        if (err) return console.log(err);
        console.log("Saved file");

        fs.readFile("tabs.txt", 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            res.send("response from /test " + data);
        });
    });
});

app.get('/getTabs', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    fs.readFile("tabs.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});

app.use(express.static(__dirname));
