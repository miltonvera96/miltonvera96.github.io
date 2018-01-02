var sbConnection = require('./sqldb-connection.js')

var Route = function (airline, airlineID, sourceAirport, sourceAirportID, destinationAirport, destinationAirportID, codeshare, stops, equipment){

  this.airline = airline;
  this.airlineID = airlineID;
  this.sourceAirport = sourceAirport;
  this.sourceAirportID = sourceAirportID;
  this.destinationAirport = destinationAirport;
  this.destinationAirportID = destinationAirportID;
  this.codeshare = codeshare;
  this.stops = stops;
  this.equipment = equipment;


  this.agregarBd = function(){
    var sql = "INSERT INTO Route(airline, airlineID, sourceAirport, sourceAirportID, destinationAirport, destinationAirportID, codeshare, stops, equipment) VALUES('"
    + this.airline + "','"
    + this.airlineID + "','"
    + this.sourceAirport + "','"
    + this.sourceAirportID + "','"
    + this.destinationAirport + "','"
    + this.destinationAirportID + "','"
    + this.codeshare + "','"
    + this.stops + "','"
    + this.equipment +
    "')";

    sbConnection.con.query(sql, function (err, result) {
      if (err){console.log("No se pudo agregar!");}
      else{
        return true;
      }
    });

  }

}

var crearTabla = function(){
    var sql = "CREATE TABLE Route (airline VARCHAR(255), airlineID VARCHAR(255) FOREIGN KEY REFERENCES Airline(airlineID), sourceAirport VARCHAR(255),sourceAirportID VARCHAR(255) FOREIGN KEY REFERENCES Airport(airportID),destinationAirport VARCHAR(255),destinationAirportID VARCHAR(255) FOREIGN KEY REFERENCES Airport(airportID), codeshare VARCHAR(255),stops VARCHAR(255),equipment VARCHAR(255))";

    sbConnection.con.query(sql, function (err, result) {
      if (err) {
        console.log("No se pudo crear tabla!");
      }
      else{
        console.log("Table created");
      }
    });
}

var closeRout = function(){
  sbConnection.close();
}

module.exports = {
  Route : Route,
  crearTabla : crearTabla,
  closeRout : closeRout
};
