// app/routes.js
var sbConnection = require('../config/database.js');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    // ** Change / for /src/login **
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login2.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
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

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
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


    app.get('/reservaciones',isLoggedIn,  function(req, res) {
      var user = req.user;
      var query = 'Select * From cita where cliente ="' + user.local.email + '" ;'
      sbConnection.con.query(query, function (err, result, fields) {
          if (err) throw err;
          res.render('calendar.ejs', {
            data: result
          });
      });
    });

    app.get('/crearReserva',isLoggedIn,  function(req, res) {
      var query = 'Select * From empleado;'
      sbConnection.con.query(query, function (err, result, fields) {
          if (err) throw err;
          res.render('crearReserva.ejs', {
            data: result
          });
    });
  });

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


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
