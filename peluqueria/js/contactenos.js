$(document).ready(function(){
  $('form').submit(function(event) {

    var formData = {
        Nombre        : $('input[name=Nombre]').val(),
        Motivo        : $('select[name=Motivo]').val(),
        Correo        : $('input[name=Correo]').val(),
        Mensaje       : $('textarea[name=Mensaje]').val(),
    };

    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/contactenos', // the url where we want to POST
        data        : formData, // our data object
        encode      : true,
      })
        // using the done promise callback
      .done(function(data) {
        if(data)
          alert('Correo enviado!');
      });

    event.preventDefault();

  });
});
