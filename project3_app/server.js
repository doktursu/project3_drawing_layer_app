var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Or can specify 'http://localhost:3000'
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

var server = app.listen(5000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});