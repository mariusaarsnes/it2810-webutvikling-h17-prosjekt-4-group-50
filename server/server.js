var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://it2810-50.idi.ntnu.no:27017/test');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

app.use('/api', router);

app.listen(port);
console.log('Server running on port: ' + port);