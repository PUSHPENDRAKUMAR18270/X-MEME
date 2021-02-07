// jshint esversion:6
const mongoose = require('mongoose');
module.exports.connection=function(){
    //connect with database
    mongoose.connect('mongodb+srv://pkc3766:Utr@1010@cluster0.7n9fq.mongodb.net/StreamedMemesDB?retryWrites=true&w=majority',{
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

module.exports.createMemeCollection=function(){
    //connection();
    const productionMemeCollection= mongoose.Schema({
        memeOwner:String,
        caption:String,
        URL:String
    });
    return mongoose.model("productionMeme",productionMemeCollection);
};
