var express = require('express');
var app = express();
var bodyParser = require('body-parser');
/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');*/
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/name/:name/', function (req, res) {
    MongoClient.connect('mongodb://gruppe50:gruppe50@it2810-shard-00-00-qogwh.mongodb.net:27017,it2810-shard-00-01-qogwh.mongodb.net:27017,it2810-shard-00-02-qogwh.mongodb.net:27017/test?ssl=true&replicaSet=IT2810-shard-0&authSource=admin', function(err, db) {
        console.log(err);
        console.log("Connected correctly to database");
        console.log(db.collection("test").findOne({name: req.params.name}, function(err, item) {
            res.json(item);
        }));
        db.close();
    });
});

router.get('/names', function (req, res) {
    MongoClient.connect('mongodb://gruppe50:gruppe50@it2810-shard-00-00-qogwh.mongodb.net:27017,it2810-shard-00-01-qogwh.mongodb.net:27017,it2810-shard-00-02-qogwh.mongodb.net:27017/test?ssl=true&replicaSet=IT2810-shard-0&authSource=admin', function(err, db) {
        console.log(db.collection("test").find(function(err, item) {
            var names = [];
            item.forEach(function(data) {
                if (data !== undefined) {
                    names.push(JSON.stringify(data));
                }
            }, function() {
                res.json(names);
            });
        }));
        db.close();
    });
});

app.use('/api', router);

app.listen(port);
console.log('Server running on port: ' + port);