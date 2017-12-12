// // tar -zxvf mongodb-osx-ssl-x86_64-3.6.0.tgz
//
//
// const express = require('express');
// const routes = require('routes/app');
//
// //set up express
// const app = express();
//
// app.use(routes);
//
// // listen for requests
// app.listen(process.env.port || 4000, function(){
//   console.log('now listening on 4000')
// });

var express=require('express');
var app=express();

app.use(express.static(__dirname + '../'));

var server=app.listen(8888,function(){
    console.log('Servidor web iniciado');
});
