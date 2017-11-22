var  express = require('express');

var app = express();

app.use('/assets', express.static('assets'));
app.use('/bootstrap', express.static('bootstrap'));
app.use('/css', express.static('css'));
app.use('/'),express.static('css');


app.set('view engine', 'ejs');

app.get('/index.html', function(req, res){

	res.sendFile(__dirname +'/index.html');
});

app.get('/contactenos.html', function(req, res){

	res.sendFile(__dirname+ '/contactenos.html');
});

app.get('/servicios.html', function(req, res){

	res.sendFile(__dirname +'/servicios.html');
});

app.get('/promociones.html', function(req, res){

	res.sendFile(__dirname +'/promociones.html');
});

app.get('/peluqueria.html', function(req, res){

	res.sendFile(__dirname +'/peluqueria.html');
});

app.get('/masajes.html', function(req, res){

	res.sendFile(__dirname +'/masajes.html');
});

app.get('/paraHombres.html', function(req, res){

	res.sendFile(__dirname +'/paraHombres.html');
});

app.get('/manicure.html', function(req, res){

	res.sendFile(__dirname +'/manicure.html');
});

app.get('/pedicure.html', function(req, res){

	res.sendFile(__dirname +'/pedicure.html');
});

app.get('/manicure.html', function(req, res){

	res.sendFile(__dirname +'/manicure.html');
});

app.get('/faciales.html', function(req, res){

	res.sendFile(__dirname +'/faciales.html');
});

app.listen(3000);
