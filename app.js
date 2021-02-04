// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require('mongoose');

const app = express();
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use(express.static("public"));

//database utitlity functions
const memeStreamDb = require(__dirname+'/db.js');

//error handling if all fields are not provided success message if submitted successfully

app.get("/",function(req,res){
    console.log("Requesting home page");
    res.render('home');
});

app.get('*', function(req, res) {
    res.render('error');
});


app.listen(3000,function(){
    console.log("server started at port 3000");
});
