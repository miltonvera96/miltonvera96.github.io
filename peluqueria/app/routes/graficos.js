var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');
var sbConnection = require('../../config/database.js');


router.get('/api/empleados', function (req, res) {
  var empleados = [];
  var cifras = [];
  var query = 'call clientesporempleado(2018);';
  sbConnection.con.query(query, function (err, result, fields) {
      if (err) throw err;
      result = result[0];
      result.forEach(function(item, index){
        empleados.push(item.empleado);
        cifras.push(item.total);
      });
      res.send({
        empleados : empleados,
        cifras : cifras
      });

  });

});

router.get('/api/ventas', function (req, res) {
    // use mongoose to get all todos in the database
    var array = [0,0,0,0,0,0,0,0,0,0,0,0];
    var query = 'call ventasporanio(2018);';
    sbConnection.con.query(query, function (err, result, fields) {
        if (err) throw err;
        result = result[0];
        console.log(result);
        result.forEach(function(item, index){
          array[item.Mes -1 ] = parseFloat(item.total);
        });
        res.send(array);

    });
});


router.get('/api/servicios', function (req, res) {

  var numeros = [];
  var tipos = [];
  var query = 'call ventasportipo(2018);';
  sbConnection.con.query(query, function (err, result, fields) {
      if (err) throw err;
      result = result[0];
      console.log(result);
      result.forEach(function(item, index){
        numeros.push(parseFloat(item.cant));
        tipos.push(item.nombre);
      });
      data = {
        numeros : numeros,
        tipos : tipos
      }
      res.send(data);

  });
});

module.exports = router;
