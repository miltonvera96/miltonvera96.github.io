var express  = require('express');
var app  = express();
var port     = process.env.PORT || 8080;

var sbConnection = require('./sqldb-connection.js')


var paisSalida = 'Russia';
var paisLlegada = 'India';

// var query = "Select A.name, A.iata, A.country from Airline A, (SELECT distinct(airlineID) as airlineID from Route R where sourceAirportID in (select airportID from Airport A where A.country = '" + paisSalida +"') and destinationAirportID in (select airportID from Airport A where A.country = '" + paisLlegada +"')) as P where A.airlineID = P.airlineID;";
// sbConnection.con.query(query, function (err, result, fields) {
//     if (err) throw err;
//     // console.log(result[0]['name']);
//     // console.log(result[1]['name']);
// });


// var query2 = "Select distinct(country) as country from Airport";
// sbConnection.con.query(query2, function (err, result, fields) {
//     if (err) throw err;
//     let control1 = $('#ControlSelect1');
//     let control2 = $('#ControlSelect2');
//
//     for (let i=0; i<result.length; i++){
//       var l = $("<option>" + result[i]['country'] + "</option>");
//       control1.append(l);
//       control2.append(l);
//     }
//     // console.log(result[0]['name']);
//     // console.log(result[1]['name']);
//     console.log(result);
// });
//
sbConnection.close();

app.use(express.static(__dirname + '/'));

  var server = app.listen(port, function(){
    console.log('Servidor web iniciado on port ' + port);
});
