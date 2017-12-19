var fs = require('fs');
var readline = require('readline');
var AirportObj = require('./airports.js');
var AirlineObj = require('./airlines.js');
var RouteObj = require('./routes.js');

// var rd = readline.createInterface({
//     input: fs.createReadStream('airports.dat'),
//     //output: process.stdout,
//     console: false
// });
//
// rd.on('line', function(line) {
//
// 	var linesplit = line.split(',');
// 	var aeropuerto1 = new AirportObj.Airport(linesplit[0],
//     linesplit[1], linesplit[2], linesplit[3], linesplit[4],
//     linesplit[5], linesplit[6], linesplit[7], linesplit[8],
//     linesplit[9], linesplit[10], linesplit[11], linesplit[12],
//     linesplit[12]);
//     aeropuerto1.agregarBd();
// });
//
// AirportObj.closeAir();

//AirlineObj.crearTabla();

// var rd = readline.createInterface({
//     input: fs.createReadStream('airlines.dat'),
//     //output: process.stdout,
//     console: false
// });
//
// rd.on('line', function(line) {
//
// 	var linesplit = line.split(',');
// 	var airline1 = new AirlineObj.Airline(linesplit[0],
//     linesplit[1], linesplit[2], linesplit[3], linesplit[4],
//     linesplit[5], linesplit[6], linesplit[7]);
//     airline1.agregarBd();
// });

//AirlineObj.closeAirl();
RouteObj.crearTabla();

var rd = readline.createInterface({
    input: fs.createReadStream('airlines.dat'),
    //output: process.stdout,
    console: false
});

rd.on('line', function(line) {

	var linesplit = line.split(',');
	var airline1 = new RouteObj.Route(linesplit[0],
    linesplit[1], linesplit[2], linesplit[3], linesplit[4],
    linesplit[5], linesplit[6], linesplit[7]);
    airline1.agregarBd();
});
