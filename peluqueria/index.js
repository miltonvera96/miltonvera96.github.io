// mongod --dbpath /Users/Usuario/Desktop/Aldair/2017_2S/DAW/mongodb/data

var express=require('express');
var app=express();

app.use(express.static(__dirname + '/'));

var server=app.listen(8888,function(){
    console.log('Servidor web iniciado');
});
