// jshint esversion:6
const mongoose = require('mongoose');
module.exports.connection=function(){
    //connect with database
    mongoose.connect('mongodb://localhost/MemeStreamDb',{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    mongoose.connection.once('open',function(){
        console.log('connection has been made');
    }).on('error',function(error){
        console.log('error is'+error);
    });
};

module.exports.createComposeCollection=function(){
    //connection();
    const composeCollection= mongoose.Schema({
        owner:String,
        caption:String,
        url:String
    });
    return mongoose.model("compose",composeCollection);
};
