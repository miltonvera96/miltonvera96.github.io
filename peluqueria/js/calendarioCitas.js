$(document).ready(function(){

  $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listWeek'
        },
        defaultDate: '2018-02-12',
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: {
          url: '/citasCalendario',
          type: 'get',
          error: function() {
              alert('there was an error while fetching events!');
          },
          color: 'green',   // a non-ajax option
          textColor: 'white' // a non-ajax option
        },
        eventClick: function(calEvent, jsEvent, view) {

          alert('Event: ' + calEvent.title);
          alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          alert('View: ' + view.name);

          // change the border color just for fun
          $(this).css('border-color', 'red');

        }
  });
});
