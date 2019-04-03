var request = require("request");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/', function (req, res) {
    res.render('home');
});


app.get('/results', function (req, res) {
    var sear = req.query.search;
    var url = 'http://www.omdbapi.com/?s=' + sear + '&apikey=thewdb&';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render('results', { data: data });
        }
        else {
            res.redirect("back");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Movie App Server has Started!!!');
});
