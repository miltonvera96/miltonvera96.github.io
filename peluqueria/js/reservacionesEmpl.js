$(document).ready(function(){

  $("tbody").on("click","a[class$='cancelar']", function(e) {
    e.preventDefault();
    var r = confirm("Desea cancelar este registro?");
    if (r == true) {
    var id = this.href;
      $.ajax({
        type: "post",
        url: id
      })
      .done(function(data) {
        tabla.clear();
        tabla.rows.add(data);
        tabla.draw();
      });
    }

  });

  $("tbody").on("click","a[class$='confirmar']",function(e) {
    e.preventDefault();
      var id = this.href;
      $.ajax({
          type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
          url         : id // the url where we want to POST
        })
        .done(function(data) {
          tabla.clear();
          tabla.rows.add(data);
          tabla.draw();
        });

      event.preventDefault();
      if(formData.mes === 'todos'){
        $('caption').text('Lista de Reservas del ' + formData.anio);
      }else{
        $('caption').text('Lista de Reservas de ' + meses[parseInt(formData.mes) - 1] + ' del ' + formData.anio);
      }
  });

  var tabla  = $('#tablaReservaciones').DataTable( {
    searching: false,
    bLengthChange : false,
    ajax: {
        url: '/citas/cargarCitas',
        dataSrc: ''
    },
    columns: [
        { data: 'hora' },
        { data: 'descripcion' },
        { data: 'servicio' },
        { data: 'cedulaCliente' },
        { data: 'nombreCliente' },
        { data: 'estado' },
        { data: 'acciones' }
    ],
    oLanguage: {
          sProcessing:     "Procesando...",
  		    sLengthMenu: 'Mostrar <select>'+
  		        '<option value="10">10</option>'+
  		        '<option value="20">20</option>'+
  		        '<option value="30">30</option>'+
  		        '<option value="40">40</option>'+
  		        '<option value="50">50</option>'+
  		        '<option value="-1">All</option>'+
  		        '</select> registros',
  		    sZeroRecords:    "No se encontraron resultados",
  		    sEmptyTable:     "No hay ninguna cita para cargar",
  		    sInfo:           "Mostrando del (_START_ al _END_) de un total de _TOTAL_ registros",
  		    sInfoEmpty:      "Mostrando del 0 al 0 de un total de 0 registros",
  		    sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
  		    sInfoPostFix:    "",
  		    sSearch:         "Filtrar:",
  		    sUrl:            "",
  		    sInfoThousands:  ",",
  		    sLoadingRecords: "Por favor espere - cargando...",
  		    oPaginate: {
  		        sFirst:    "Primero",
  		        sLast:     "Último",
  		        sNext:     "Siguiente",
  		        sPrevious: "Anterior"
  		    },
  		    oAria: {
  		        sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
  		        sSortDescending: ": Activar para ordenar la columna de manera descendente"
  		    }
          }
    } );

    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    $('form').submit(function(event) {

      var formData = {
          'anio'        : $('select[name=anio]').val(),
          'dia'        : $('select[name=dia]').val(),
          'mes'         : $('select[name=mes]').val(),
      };

      $.ajax({
          type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
          url         : '/citas/buscarReservasEmpl', // the url where we want to POST
          data        : formData, // our data object
          encode      : true,
        })
          // using the done promise callback
        .done(function(data) {
          tabla.clear();
          tabla.rows.add(data);
          tabla.draw();
        });

      event.preventDefault();
      if(formData.mes === 'todos'){
        $('caption').text('Lista de Reservas del ' + formData.anio);
      }else{
        $('caption').text('Lista de Reservas de ' + meses[parseInt(formData.mes) - 1] + ' del ' + formData.anio);
      }
    });

});
