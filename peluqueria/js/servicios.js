$(document).ready(function(){

  $("tbody").on("click","a[class$='eliminar']", function(e) {
    e.preventDefault();
    var r = confirm("Desea eliminar este registro?");
    if (r == true) {
    var id = this.href;
      $.ajax({
        type: "delete",
        url: id
      });
    }

  });

  $("tbody").on("click","a[class$='editar']",function(e) {
    e.preventDefault();
      var id = this.href;
      $.ajax({
        type: "post",
        url: id
      }).done(function(response) {
        document.write(response);
      });
  });

  var tabla  = $('#tablaServicios').DataTable( {
    ajax: {
        url: '/servicios/cargarServicios',
        dataSrc: ''
    },
    columns: [
        { data: 'idservicios' },
        { data: 'nombre' },
        { data: 'tipo' },
        { data: 'precio' },
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
  		    sEmptyTable:     "Ningún dato disponible en esta tabla",
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

});
