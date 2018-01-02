//
con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});



var rd = readline.createInterface({
    input: fs.createReadStream('airports.dat'),
    //output: process.stdout,
    console: false
});

rd.on('line', function(line) {

	var linesplit = line.split(',');
	var aeropuerto1 = new AirportObj.Airport(linesplit[0],
  linesplit[1].slice(1,-2), linesplit[2].slice(1,-2), linesplit[3].slice(1,-2), linesplit[4].slice(1,-2),
  linesplit[5].slice(1,-2), linesplit[6], linesplit[7], linesplit[8],
  linesplit[9], linesplit[10].slice(1,-2), linesplit[11].slice(1,-2), linesplit[12].slice(1,-2),
  linesplit[12].slice(1,-2));
    aeropuerto1.agregarBd();
});

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
//RouteObj.crearTabla();
// var count = 0;
// var rd = readline.createInterface({
//     input: fs.createReadStream('./routes.dat'),
//     //output: process.stdout,
//     console: false
// });
//
// rd.on('line', function(line) {
//
// 	var linesplit = line.split(',');
// 	var route1 = new RouteObj.Route(linesplit[0],
//     linesplit[1], linesplit[2], linesplit[3], linesplit[4],
//     linesplit[5], linesplit[6], linesplit[7], linesplit[8]);
//     var v= route1.agregarBd()
//     if(v){
//       count++;
//       process.stdout.clearLine();
//       process.stdout.cursorTo(0);
//       process.stdout.write("Agreado " + count)
//
//     }
// });
