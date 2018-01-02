var fs = require('fs');
var readline = require('readline');
var AirportObj = require('./airports.js');
var AirlineObj = require('./airlines.js');
var RouteObj = require('./routes.js');
var LineByLineReader = require('line-by-line');

//**** Leer archivo airports.dat y guardarlo en la base de datos ****

var lr = new LineByLineReader('airports.dat');

lr.on('error', function (err) {
  console.log('error to open a file');
	// 'err' contains error object
});
var count = 0;
lr.on('line', function (line) {
  let linesplit = line.split(',');
	let aeropuerto1 = new AirportObj.Airport(linesplit[0],
  linesplit[1].slice(1,-1), linesplit[2].slice(1,-1), linesplit[3].slice(1,-1), linesplit[4].slice(1,-1),
  linesplit[5].slice(1,-1), linesplit[6], linesplit[7], linesplit[8],
  linesplit[9], linesplit[10].slice(1,-1), linesplit[11].slice(1,-1), linesplit[12].slice(1,-1),
  linesplit[12].slice(1,-1));
  if(aeropuerto1.agregarBd() == 0){
    count++;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("NO AGREGADO " + count)
  }
  //console.log(line);
	// 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
  console.log('finish!');
  AirportObj.closeAir();
	// All lines are read, file is closed now.
});

/*
//**** Leer archivo airlines.dat y guardarlo en la base de datos ****
var lr = new LineByLineReader('airlines.dat');

lr.on('error', function (err) {
  console.log('error to open a file');
	// 'err' contains error object
});
var count = 0;
lr.on('line', function (line) {
  let linesplit = line.split(',');
  let airline1 = new AirlineObj.Airline(linesplit[0],
      linesplit[1].slice(1,-1), linesplit[2], linesplit[3].slice(1,-1), linesplit[4].slice(1,-1),
      linesplit[5].slice(1,-1), linesplit[6].slice(1,-1), linesplit[7].slice(1,-1));
  let v = airline1.agregarBd();
  if(v == 0){
    count++;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("NO AGREGADO " + count)
  }
  //console.log(line);
	// 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
  console.log('finish!');
  AirlineObj.closeAirl();
	// All lines are read, file is closed now.
});
*/
/*
//**** Leer archivo routes.dat y guardarlo en la base de datos ****
lr = new LineByLineReader('routes.dat');

lr.on('error', function (err) {
  console.log('error to open a file');
	// 'err' contains error object
});

lr.on('line', function (line) {
  let linesplit = line.split(',');
  let route1 = new RouteObj.Route(linesplit[0],
      linesplit[1], linesplit[2], linesplit[3], linesplit[4],
      linesplit[5], linesplit[6], linesplit[7], linesplit[8]);
  route1.agregarBd();
  //console.log(line);
	// 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
  console.log('finish!');
  RouteObj.closeRout();
	// All lines are read, file is closed now.
});
*/
