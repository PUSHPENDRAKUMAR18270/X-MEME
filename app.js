// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require('mongoose');
const session = require('express-session');
const { body,validationResult } = require('express-validator');
const app = express();
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'Utr@1010',
    resave: true,
    saveUninitialized: true
}));


//flash message middleware
app.use((req, res, next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
  })

//database utitlity functions
const StreamedMemesDB = require(__dirname+'/db.js');
StreamedMemesDB.connection();
const Meme = StreamedMemesDB.createMemeCollection();
//error handling if all fields are not provided success message if submitted successfully
app.get("/",function(req,res){
    // console.log("Requesting home page");
    res.render('xmeme');
});

app.get("/memes",function(req,res){
    var action = function (err, collection) {
        collection.find().toArray(function(err, results) {
            results.reverse();
            res.render('home',{memes:results});
        });
    };
    mongoose.connection.db.collection('productionmemes',action);
});



app.post("/memes",[body('memeOwner', 'Invalid name').trim().isLength({ min: 1 }),
    body('caption', 'Invalid caption').trim().isLength({ min: 1 }),
    body('URL', 'Invalid URL').trim().isLength({min:1})],
    function(req,res){
        let errors = validationResult(req);
        let errorArray=errors.array();
        // console.log(errorArray);
        if(errorArray.length>0)
        {
            req.session.message = {
                type: 'danger',
                intro: 'please fill all the details ',
                message: 'name, caption, URL must not be empty'
              };
              res.redirect('/memes');
        }
        else{
            req.session.message = {
                type: 'success',
                intro: 'Thank you!!',
                message: 'your meme has been streamed successfully'
              }
                const ownerName=req.body.memeOwner;
                const caption=req.body.caption;
                const URL=req.body.URL;
                const meme = new Meme({
                    memeOwner: ownerName,
                    caption:caption,
                    URL: URL
                });
                meme.save(function(err){
                    if (!err){
                        res.redirect("/memes");
                    }
                    else{
                        res.send("error occured please try again");
                    }
                });
            }
        }
);

app.get("/memes/:id",function(req,res){
  var id=req.params.id;
  // console.log(id);
  id-=1;
  var action = function (err, collection) {
      collection.find().toArray(function(err, results) {
        if(id>=0&&id<results.length)
          res.render('meme',{id:id+1,meme:results[id]});
        else res.render('error');
      });
  };
  mongoose.connection.db.collection('productionmemes',action);
});

app.get('*', function(req, res) {
    res.render('error');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log("server has started successfully");
});
