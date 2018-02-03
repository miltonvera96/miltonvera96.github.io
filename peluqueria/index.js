// mongod --dbpath /Users/Usuario/Desktop/Aldair/2017_2S/DAW/mongodb/data

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var methodOverride = require('method-override')

var configDB = require('./config/database.js');
var routesContact = require('./app/routes/mail');
var routesGraf = require('./app/routes/graficos');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('_method'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'divaspa8' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes/routes.js')(app, passport);
require('./app/routes/routesCliente.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.use(routesContact);
app.use(routesGraf);
// launch ======================================================================

app.use(express.static(__dirname + '/'));

var server = app.listen(port, function(){
    console.log('Servidor web iniciado on port ' + port);
});
