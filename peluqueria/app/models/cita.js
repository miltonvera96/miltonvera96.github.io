  var sbConnection = require('/config/database.js');


  var query = 'Select * From cita ;'
  sbConnection.con.query(query, function (err, result, fields) {
      if (err) throw err;
      alert(result);

  });
  var array = [];
  var obj = {
    title: 'Hola Milton',
    start: '2017-12-07',
    end: '2017-12-10'
  };
  array[0] = obj;
