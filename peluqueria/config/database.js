var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mialvera",
  database: "peluqueria"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

close = function(){
  con.end();
}


module.exports = {

    'url' : 'mongodb://localhost:27017/test', // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    con : con,
    close : close
};
