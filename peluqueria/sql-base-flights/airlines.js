var sbConnection = require('./sqldb-connection.js')

var Airline = function (airlineID, name, alias, iata, icao, callsign, country, active){

  this.airlineID = airlineID;
  this.name = name;
  this.alias = alias;
  this.iata = iata;
  this.icao = icao;
  this.callsign = callsign;
  this.country = country;
  this.active = active;


  this.agregarBd = function(){
    var sql = "INSERT INTO Airline VALUES('"
    + this.airlineID + "','"
    +  this.name + "','"
    +  this.alias + "','"
    +  this.iata + "','"
    +  this.icao + "','"
    +  this.callsign + "','"
    +  this.country + "','"
    +  this.active +
    "')";

    sbConnection.con.query(sql, function (err, result) {
      if (err){
        //throw err;
        console.log("No se pudo agregar!");
      }
    });

  }

}

var crearTabla = function(){
    var sql = "CREATE TABLE Airline (airlineID VARCHAR(255) primary key, name VARCHAR(255), alias VARCHAR(255), iata VARCHAR(255), icao VARCHAR(255), callsign VARCHAR(255), country VARCHAR(255), active VARCHAR(255))";

    sbConnection.con.query(sql, function (err, result) {
      if (err) {
        console.log("No se pudo crear tabla!");
      }
      console.log("Table created");
    });
}

var closeAirl = function(){
  sbConnection.close();
}

module.exports = {
  Airline : Airline,
  crearTabla : crearTabla,
  closeAirl : closeAirl
};
