var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mialvera",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

close = function(){
  con.end();
}
module.exports = {
  con : con,
  close : close
};
