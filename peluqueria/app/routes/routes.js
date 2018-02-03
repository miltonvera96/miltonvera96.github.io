// app/routes.js
var sbConnection = require('../../config/database.js');
var wait     = require('wait.for');
var bodyParser = require('body-parser');
var User            = require('../models/user');
var Admin            = require('../models/admin');
var mail  = require('../../config/mail');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

module.exports = function(app, passport) {



    app.get('/adminlogin', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login2.ejs', { role: '/adminlogin', message: req.flash('loginMessage') });
    });




    app.post('/adminsignup', passport.authenticate('admin-signup', {
        successRedirect : '/cuentas', // redirect to the secure profile section
        failureRedirect : '/cuentas', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/modersignup', passport.authenticate('moder-signup', {
        successRedirect : '/cuentas', // redirect to the secure profile section
        failureRedirect : '/cuentas', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/cuentasignup', urlencodedParser, function(req, res){
      if(req.body.role === 'admin'){
        res.redirect(307, '/adminsignup');
      }
      else if(req.body.role === 'moderador'){
        res.redirect(307, '/modersignup');
      }
    });

   // process the admin login form
   app.post('/adminlogin', passport.authenticate('admin-login', {
       successRedirect : '/admin', // redirect to the secure profile section
       failureRedirect : '/adminlogin', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
   }));



    app.get('/admin', isCuentaIn, function(req, res) {
      console.log(req.user);
        res.render('adminProfile.ejs', {
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



  // application -------------------------------------------------------------
  app.get('/grafica', isAdminIn, function (req, res) {
      res.render('grafica.ejs'); // load the single view file (angular will handle the page changes on the front-end)
  });

  app.get('/servicios', isAdminIn, function (req, res) {
      res.render('servicios.ejs'); // load the single view file (angular will handle the page changes on the front-end)
  });

  app.get('/servicios/cargarServicios',isAdminIn,  function(req, res) {
    var query = 'select s.idservicios, s.nombre, h.nombre as tipo, s. precio from servicios s join habilidades h on s.descripcion = h.idhabilidad;';
    sbConnection.con.query(query, function (err, result, fields) {
        if (err) throw err;
        for (var i=0; i<result.length; i++){
          result[i].acciones = '<a href="/servicios/editar/' + result[i].idservicios + '" class="btn btn-info editar" role="button"><span class="glyphicon glyphicon-pencil"></a> <a href="/servicios/eliminar/'+ result[i].idservicios + '" class="btn btn-danger eliminar" role="button"><span class="glyphicon glyphicon-remove"></a>'
        }
        res.send(result)
    });
  });

  app.get('/empleados', isAdminIn, function (req, res) {
      res.render('empleados.ejs'); // load the single view file (angular will handle the page changes on the front-end)
  });

  app.get('/empleados/cargarEmpleados',isAdminIn,  function(req, res) {
    var query = 'select * from empleado;';
    sbConnection.con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
  });

  app.get('/cuentas', isAdminIn, function (req, res) {
      res.render('cuentas.ejs'); // load the single view file (angular will handle the page changes on the front-end)
  });

  app.get('/cuentas/cargarCuentas',isAdminIn,  function(req, res) {
    getCuentas(res);
  });


  app.get('/citas',isModerIn,  function(req, res) {
    var date = new Date();
    var mes = date.getMonth() + 1;
    var anio = date.getFullYear();
    var fecha = {
      mes : meses[date.getMonth()],
      anio: anio
    }
    res.render('reservacionesEmpl.ejs', {
      fecha: fecha
    });
  });

  app.get('/citas/cargarCitas',isModerIn,  function(req, res) {
    var user = req.user;
    var date = new Date();
    var mes = date.getMonth() + 1;
    var anio = date.getFullYear();
    var query = 'call cargarReservasEmpleados("' + user.local.email + '","' + anio + '","' + mes + '");';
    sbConnection.con.query(query, function (err, result, fields) {
        if (err) throw err;
        for (var i=0; i<result[0].length; i++){
          result[0][i].acciones = '<a href="citas/confirmar/' + result[0][i].idcita + '" class="btn btn-info editar" role="button"><span class="glyphicon glyphicon-ok"></a> <a href="citas/cancelar/'+ result[0][i].idcita + '" class="btn btn-danger eliminar" role="button"><span class="glyphicon glyphicon-remove"></a>'
        }
        res.send(result[0])
    });
  });

};


function getCuentas(res) {
    Admin.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

// route middleware to make sure a admin is logged in
function handleAdminIn(req, res, next){

  if (req.isAuthenticated()){
    var logged = wait.forMethod(Admin, "findById", req.user._id);
    console.log(logged);
    if(logged && logged.local.role === 'Administrador')
      return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/adminlogin');
}

function isAdminIn(req, res, next) {
  // if user is authenticated in the session, carry on
  wait.launchFiber(handleAdminIn,req, res, next);
}

// route middleware to make sure a moderador is logged in
function handleModerIn(req, res, next){

  if (req.isAuthenticated()){
    var logged = wait.forMethod(Admin, "findById", req.user._id);
    if(logged && logged.local.role === 'Moderador')
      return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/adminlogin');
}

function isModerIn(req, res, next) {
  // if user is authenticated in the session, carry on
  wait.launchFiber(handleModerIn,req, res, next);
}

// route middleware to make sure a moderador is logged in
function handleCuentaIn(req, res, next){

  if (req.isAuthenticated()){
    var logged = wait.forMethod(Admin, "findById", req.user._id);
    if(logged)
      return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/adminlogin');
}

function isCuentaIn(req, res, next) {
  // if user is authenticated in the session, carry on
  wait.launchFiber(handleCuentaIn,req, res, next);
}
