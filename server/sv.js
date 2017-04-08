// params
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// const
const serverPort = 3001

// body-parser
app.use(bodyParser.json())

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Set Content-Type
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Pass to next layer of middleware
    next();
});

// listen
app.listen(serverPort, function () {
    console.log('Listening on port ' + serverPort)
})

// routing
app.use('/apis', require('./routes/apis'))