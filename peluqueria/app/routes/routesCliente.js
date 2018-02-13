var sbConnection = require('../../config/database.js');
var wait     = require('wait.for');
var bodyParser = require('body-parser');
var User            = require('../models/user');
var Admin            = require('../models/admin');
var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
var mail  = require('../../config/mail');
var express = require('express');
var moment = require('moment');
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app, passport) {
  // HOME PAGE  ========
  // Presenta link de login y signup  a la pagina
  app.get('/', function(req, res) {
      res.render('index.ejs'); // load the index.ejs file
  });

  // LOGIN ===============================
  // Presenta formulario de Inicio de sesion
  app.get('/login', function(req, res) {
      // render the page and pass in any flash data if it exists
      res.render('login2.ejs', { role: '/login', message: req.flash('loginMessage') });
  });

  // SIGNUP ==============================
  // Presenta formulario de registro
  app.get('/signup', function(req, res) {

      // render the page and pass in any flash data if it exists
      res.render('signup.ejs', { message: req.flash('signupMessage') });
  });


  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
     successRedirect : '/profile', // redirect to the secure profile section
     failureRedirect : '/login', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
  }));

  // PROFILE SECTION =====================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
          user : req.user // get the user out of session and pass to template
      });
  });

  // CARGA LA PAGINA DE LAS RESERVACIONDES DE CADA CLIENTE
  //
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/reservaciones',isLoggedIn,  function(req, res) {
    getReservaciones(req, res);
  });

  app.get('/reservaciones/cargarReservas',isLoggedIn,  function(req, res) {
    var user = req.user;
    var date = new Date();
    var mes = date.getMonth() + 1;
    var anio = date.getFullYear();
    var query = 'call cargarReservas("' + user.local.email + '","' + anio + '","' + mes + '");';
    sbConnection.con.query(query, function (err, result, fields) {
        if (err) throw err;
        for (var i=0; i<result[0].length; i++){
          result[0][i].acciones = '<a href="reservaciones/editar/' + result[0][i].idcita + '" class="btn btn-info editar" role="button"><span class="glyphicon glyphicon-pencil"></a> <a href="reservaciones/eliminar/'+ result[0][i].idcita + '" class="btn btn-danger eliminar" role="button"><span class="glyphicon glyphicon-remove"></a>'
        }
        res.send(result[0])
    });
  });


  // RENDERIZA PAGINA PARA CREAR UNA RESERVACION
  app.get('/crearReserva',isLoggedIn,  function(req, res) {
        res.render('crearReserva.ejs');
  });

  app.post('/crearReserva',isLoggedIn, urlencodedParser, function(req, res) {
    var user = req.user;
    let respt = req.body;
    var query = 'Insert into cita (fechaC, hora, descripcion, estado, cliente, empleado, nombreCliente, cedulaCliente,total,servicio) \
      values ("'+ respt.fecha + '", "'+ respt.hora +'", "'+ respt.descripcion +'\
      ","En espera", "' + user.local.email + '", "' + respt.empleado + '", "' + respt.nombre + '", "' + respt.cedula + '",' + respt.total + ','+ respt.servicios + ');';
    sbConnection.con.query(query, function (err, result, fields) {
        if (err){
          res.sendStatus(500);
        }
        else {
          mail.enviarMailReservaFunc('miltonvera96@gmail.com',respt.nombre ,respt.fecha,respt.hora, respt.descripcion, respt.empleado);
          res.redirect('/reservaciones');
        }
    });

  });

// ENDPOINT PARA LEER LOS DATOS DE UN USUARIO
  app.get('/datos',isLoggedIn,  function(req, res) {
    var user = req.user;
    var query = 'Select * From cliente where email ="' + user.local.email + '" ;'
    sbConnection.con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.render('editar.ejs', {
          data: result
        });
      });
  });

// ENDPOINT PARA BUSCAR LAS RESERVAS SEGUN FECHA Y TIPO
  app.post('/buscarReservas', isLoggedIn, function(req, res){
    var user = req.user;
    var busq = req.body
    var query = 'call buscarCitas("' + busq.tipo + '", "' + busq.anio + '", "' + busq.mes + '", "' + user.local.email + '");'
    sbConnection.con.query(query, function (err, result, fields) {
        if (err) throw err;
        for (var i=0; i<result[0].length; i++){
          result[0][i].acciones = '<a href="reservaciones/editar/' + result[0][i].idcita + '" class="btn btn-info editar" role="button"><span class="glyphicon glyphicon-pencil"></a> <a href="reservaciones/eliminar/'+ result[0][i].idcita + '" class="btn btn-danger eliminar" role="button"><span class="glyphicon glyphicon-remove"></a>'
        }
        res.send(result[0])
    });
  });

// ENDPOINT PARA ELIMINAR UNA RESERVACION DADO UN ID DE LA RESERVACION
  app.delete('/reservaciones/eliminar/:id', isLoggedIn, function(req, res){
    var query = 'delete from cita where idcita = "' + req.params.id + '";'
    sbConnection.con.query(query, function (err, result, fields) {
      if (err) throw err;
      getReservaciones(req, res);
      });
    });

function handleEdit(req, res){
  var query1 = 'select * from cita where idcita = "' + req.params.id + '";';
  var cita = wait.forMethod(sbConnection.con, "query", query1);
  res.render('editarReserva.ejs', {
    cita: cita[0]
  });
}

  // ENDPOINT PARA EDITAR UNA RESERVACION DADO UN ID DE LA RESERVACION
  app.post('/reservaciones/editar/:id', isLoggedIn, function(req, res){
    wait.launchFiber(handleEdit, req, res);

  });

  // ACTUALIZA UNA RESERVA
  app.put('/reservaciones/actualizar/:id',isLoggedIn, urlencodedParser, function(req, res) {
    var user = req.user;
    let respt = req.body;
    var query = 'Update cita set \
      fechaC ="'+ respt.fecha + '", hora = "'+ respt.hora +'", descripcion = "'+ respt.descripcion +'\
      ",estado = "En espera", cliente = "' + user.local.email + '", empleado = "' + respt.empleado + '", \
      nombreCliente = "' + respt.nombre + '", cedulaCliente = "' + respt.cedula + '" where idcita = "' + req.params.id+ '";'
    sbConnection.con.query(query, function (err, result, fields) {
        if (err){
          res.sendStatus(500);
        }
        else {
          res.redirect('/reservaciones');
        }
    });

  });


  function handleserviciosHab(req, res){
    var query1 = 'select * from servicios where descripcion = '+ req.body.habilidad + ';';
    var query2 = 'call habEmp ('+ req.body.habilidad + ');';


    var empleados = wait.forMethod(sbConnection.con, "query", query2);
    var servicios = wait.forMethod(sbConnection.con, "query", query1);

    console.log(servicios[0]);
    var datos = {
      servicios: servicios,
      empleados: empleados[0]
    };
    res.send(datos);

  }

  app.post('/emplHab', isLoggedIn, function(req, res){
    wait.launchFiber(handleserviciosHab, req, res);

  });


  app.post('/precioServicio', isLoggedIn, function(req, res){
    var query = 'select precio from servicios where idservicios = ' + req.body.servicio + ';';
    sbConnection.con.query(query, function (err, result, fields) {
        if (err){
          res.sendStatus(500);
        }
        else {
          res.send(result);
        }
    });
  });
};

function getReservaciones(req, res){
  var user = req.user;
  var date = new Date();
  var mes = date.getMonth() + 1;
  var anio = date.getFullYear();
  var fecha = {
    mes : meses[date.getMonth()],
    anio: anio
  }
  var query = 'Select count(*) as count From cita where cliente ="' + user.local.email + '";';
  sbConnection.con.query(query, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.render('reservaciones.ejs', {
        data: result[0].count,
        fecha: fecha
      });
  });
};
// route middleware to make sure a user is logged in
function handleLoggedIn(req, res, next){


  if (req.isAuthenticated()){
    var logged = wait.forMethod(User, "findById", req.user._id);
    if(logged)
      return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  wait.launchFiber(handleLoggedIn,req, res, next);

}
