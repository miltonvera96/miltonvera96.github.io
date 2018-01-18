// app/routes.js
var sbConnection = require('../config/database.js');
var wait     = require('wait.for');
var bodyParser = require('body-parser');

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
        res.render('login2.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

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

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // CARGA LA PAGINA DE LAS RESERVACIONDES DE CADA CLIENTE
    //
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/reservaciones',isLoggedIn,  function(req, res) {
      var user = req.user;
      var date = new Date();
      var mes = date.getMonth() + 1;
      var anio = date.getFullYear();
      var query = 'Select * From cita where cliente ="' + user.local.email + '" and year(fechaC)=' + anio + ' and month(fechaC)=' + mes+ ';'
      sbConnection.con.query(query, function (err, result, fields) {
          if (err) throw err;
          res.render('reservaciones.ejs', {
            data: result
          });
      });
    });

    // RENDERIZA PAGINA PARA CREAR UNA RESERVACION
    app.get('/crearReserva',isLoggedIn,  function(req, res) {
      var query = 'Select * From empleado;'
      sbConnection.con.query(query, function (err, result, fields) {
          if (err) throw err;
          res.render('crearReserva.ejs', {
            data: result
          });
    });
  });

  // ENDPOINT PARA GUARDAR UNA CITA EN LA BASE DE DATOS
  app.post('/crearReserva',isLoggedIn, urlencodedParser, function(req, res) {
    var user = req.user;
    let respt = req.body;
    var query = 'Insert into cita (fechaC, hora, descripcion, estado, cliente, empleado, nombreCliente, cedulaliente) \
      values ("'+ respt.fecha + '", "'+ respt.hora +'", "'+ respt.descripcion +'\
      ","En espera", "' + user.local.email + '", "' + respt.empleado + '", "' + respt.nombre + '", "' + respt.cedula + '");'
    sbConnection.con.query(query, function (err, result, fields) {
        if (err){
          res.sendStatus(500);
        }
        else {
          res.redirect('/crearReserva');
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
          res.send(result);
        });
      });

  // ENDPOINT PARA ELIMINAR UNA RESERVACION DADO UN ID DE LA RESERVACION
  app.delete('/reservaciones/eliminar/:id', isLoggedIn, function(req, res){
    var query = 'delete from cita where idcita = "' + req.params.id + '";'
    sbConnection.con.query(query, function (err, result, fields) {
        if (err) throw err;
          res.redirect('/reservaciones');
        });
      });


  function handleEdit(req, res){
    var query1 = 'select * from cita where idcita = "' + req.params.id + '";'
    var query2 = 'Select * From empleado;'
    var empleados = wait.forMethod(sbConnection.con, "query", query2);
    var cita = wait.forMethod(sbConnection.con, "query", query1);

    console.log(cita[0]);
    res.render('editarReserva.ejs', {
      data: empleados,
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
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
