// require list.
var express = require('express');
var app = express();
var fs = require('fs');
var PORT = 8000;
    
// SET reqest.body PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// External router definition.
var user = require('./main')(app, fs); 

// SERVER START
var server = app.listen(PORT, function(){
    console.log('express server has started on port %d',PORT)
});


