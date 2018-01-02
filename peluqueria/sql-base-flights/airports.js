var sbConnection = require('./sqldb-connection.js')

var Airport = function (airportID, name, city, country, iata, icao, latitude, longitude, altitude, timezone, dst, tzdatabase, type, source){

  this.airportID = airportID;
  this.name = name;
  this.city = city;
  this.country = country;
  this.iata = iata;
  this.icao = icao;
  this.latitude = latitude;
  this.longitude = longitude;
  this.altitude = altitude;
  this.timezone = timezone;
  this.dst = dst;
  this.tzdatabase = tzdatabase;
  this.type = type;
  this.source = source;

  this.agregarBd = function(){
    var sql = "INSERT INTO Airport VALUES('"
    + this.airportID + "','"
    +  this.name + "','"
    +  this.city + "','"
    +  this.country + "','"
    +  this.iata + "','"
    +  this.icao + "','"
    +  this.latitude + "','"
    +  this.longitude + "','"
    +  this.altitude + "','"
    +  this.timezone + "','"
    +  this.dst + "','"
    +  this.tzdatabase + "','"
    +  this.type + "','"
    +  this.source +
    "')";

    sbConnection.con.query(sql, function (err, result) {
      if (err){
        // console.log("No se pudo agregar!");
        return 0;
      }
    });

  }

}

var crearTabla = function(){
    var sql = "CREATE TABLE Airport (airportID VARCHAR(255) primary key, name VARCHAR(255), city VARCHAR(255), country VARCHAR(255), iata VARCHAR(255), icao VARCHAR(255), latitude VARCHAR(255), longitude VARCHAR(255), altitude VARCHAR(255), timezone VARCHAR(255), dst VARCHAR(255), tzdatabase VARCHAR(255), type VARCHAR(255), source VARCHAR(255))";

    sbConnection.con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
}

var closeAir = function(){
  sbConnection.close();
}

module.exports = {
  Airport : Airport,
  crearTabla : crearTabla,
  closeAir : closeAir
};
