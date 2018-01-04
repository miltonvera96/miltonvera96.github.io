  var sbConnection = require('/config/database.js');
  var query = 'Select * From cita;'
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



  $(document).ready(function() {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2017-12-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: array

    });

  });
