// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var wait     = require('wait.for');

// load up the user model
var User            = require('../app/models/user');
var Admin            = require('../app/models/admin');
// load the mysql connection
var sbConnection = require('./database.js');


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });



    // used to deserialize the user

    function handleDeserializeUser(id, done){
      var tamano = wait.forMethod(User, "findById", id);
      if(tamano){
        User.findById(id, function(err, user) {
            done(err, user);
        });
      }else{
        Admin.findById(id, function(err, user) {
            done(err, user);
        });
      }
    }
    passport.deserializeUser(function(id, done) {
      wait.launchFiber(handleDeserializeUser, id, done);
    });

    // passport.deserializeUser(function(id, done) {
    //     Admin.findById(id, function(err, user) {
    //         done(err, user);
    //     });
    // });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                // mysql
                var query = 'Insert into cliente(email) values("' + email + '");';
                sbConnection.con.query(query, function (err, result, fields) {
                    if (err) throw err;
                });

                //mongodb
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });


            }

        });

        });

    }));



// =========================================================================
   // LOCAL LOGIN =============================================================
   // =========================================================================
   // we are using named strategies since we have one for login and one for signup
   // by default, if there was no name, it would just be called 'local'

   passport.use('local-login', new LocalStrategy({
       // by default, local strategy uses username and password, we will override with email
       usernameField : 'email',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, email, password, done) { // callback with email and password from our form

       // find a user whose email is the same as the forms email
       // we are checking to see if the user trying to login already exists
       User.findOne({ 'local.email' :  email }, function(err, user) {
           // if there are any errors, return the error before anything else
           if (err)
               return done(err);

           // if no user is found, return the message
           if (!user)
               return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

           // if the user is found but the password is wrong
           if (!user.validPassword(password))
               return done(null, false, req.flash('loginMessage', 'Ups! Constraseña incorrecta.')); // create the loginMessage and save it to session as flashdata

           // all is well, return successful user
           return done(null, user);
       });

   }));


   // =========================================================================
    // Admin LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('admin-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Admin.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);

        });

    }));


    // =========================================================================
    // Admin SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('admin-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      // asynchronous
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Admin.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new Admin();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.role = 'Administrador';
                newUser.local.password = newUser.generateHash(password);

                //mongodb
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });


            }

        });

        });

    }));


    // =========================================================================
    // Moderador SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('moder-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      // asynchronous
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Admin.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new Admin();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.role = 'Moderador';
                newUser.local.password = newUser.generateHash(password);

                console.log("Nuevo usuario:" + newUser);

                //mongodb
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });


            }

        });

        });

    }));

};
