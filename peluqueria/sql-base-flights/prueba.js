var fs = require('fs');
var readline = require('readline');

// var rd = readline.createInterface({
//     input: fs.createReadStream('airports.dat'),
//     //output: process.stdout,
//     console: false
// });
//
// rd.on('line', function(line) {
//
// 	var linesplit = line.split(',');
// 	console.log(linesplit[0],
//     linesplit[1].slice(1,-2), linesplit[2].slice(1,-2), linesplit[3].slice(1,-2), linesplit[4].slice(1,-2),
//     linesplit[5].slice(1,-2), linesplit[6], linesplit[7], linesplit[8],
//     linesplit[9], linesplit[10].slice(1,-2), linesplit[11].slice(1,-2), linesplit[12].slice(1,-2),
//     linesplit[12].slice(1,-2));
// });



var LineByLineReader = require('line-by-line');
var lr = new LineByLineReader('airports.dat');

lr.on('error', function (err) {
  console.log('error to open a file');
	// 'err' contains error object
});

lr.on('line', function (line) {
  console.log(line);
	// 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
  console.log('Termino!');
	// All lines are read, file is closed now.
});
