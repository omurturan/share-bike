var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DropOff = require('./models/dropOffModel');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/share-bike');

app.get('/', function (req, res) {
   res.end('hello from /')
});

app.post('/drop-off', function (req, res) {
    console.log(req.body);
    console.log(req.body.coordinates);

    // TODO sanity check & try/catch probably
    var coordinates = JSON.parse(req.body.coordinates);
    var name = req.body.name;

    DropOff.create({ name: name, coordinates: coordinates }, function (err, awesome_instance) {
        if (err) {
            console.log(err);
            return;
            // return handleError(err);
        }
        // saved!
        console.log('saved');
        res.json(awesome_instance);
    });
});

app.put('/drop-off/:id', function (req, res) {
    res.end();
});

app.delete('drop-off/:id', function (req, res) {
    res.end();
});

app.get('/drop-off', function (req, res) {
    DropOff.find({}, function(err, dropOffs) {
        if (err) {
            res.send(err);
        }
        res.json(dropOffs);
    });
});

app.post('/end-reservation', function () {
    res.end();
});


http.createServer(app).listen(8081, function () {
   console.log('be app started at 8081')
});
