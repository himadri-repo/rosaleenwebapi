// jshint esversion: 6

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

let app = express();

app.use(bodyParser.json({type: 'application/*+json'}));
app.use(bodyParser.raw({type: 'application/vnd.custom-type'}));
app.use(bodyParser.text({type: 'text/html'}));

app.use(morgan('combined'));

app.listen(3001, function() {
    console.log("Server running ...");
});