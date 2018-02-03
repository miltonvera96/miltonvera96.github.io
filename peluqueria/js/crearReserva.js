$(document).ready(function(){


  var descripcion = $('select[name="descripcion"]');

  var valor = descripcion.val();
  $.ajax({
    type: 'post',
    url: '/emplHab',
    data: { habilidad : valor }
  }).done(function(data){
    data.empleados.forEach(function(item, index){

      $('select[name="empleado"]').append('<option value="'+ item.cedula + '">'+ item.nombre +' ' + item.apellido + '</option>');
    });

    data.servicios.forEach(function(item, index){
      $('select[name="servicios"]').append('<option value="'+ item.idservicios + '">'+ item.nombre + '</option>');
    });

  });

  descripcion.on('change', function(){
    $('select[name="empleado"]').empty();
    $('select[name="servicios"]').empty();
    var valor = descripcion.val();
    $.ajax({
      type: 'post',
      url: '/emplHab',
      data: { habilidad : valor }
    }).done(function(data){
      data.empleados.forEach(function(item, index){

        $('select[name="empleado"]').append('<option value="'+ item.cedula + '">'+ item.nombre +' ' + item.apellido + '</option>');
      });

      data.servicios.forEach(function(item, index){
        $('select[name="servicios"]').append('<option value="'+ item.idservicios + '">'+ item.nombre + '</option>');
      });

    });
  });

  var servicios = $('select[name="servicios"]');
  servicios.on('change', function(){
    $('input[name="total"]').empty();
    var valor = servicios.val();
    $.ajax({
      type: 'post',
      url: '/precioServicio',
      data: { servicio : valor }
    }).done(function(data){
      console.log(data);
      $('input[name="total"]').attr('value', data[0].precio);

    });
  });
});
