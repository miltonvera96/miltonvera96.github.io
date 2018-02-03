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

  var tabla  = $('#tablaCuentas').DataTable( {
    ajax: {
        url: '/cuentas/cargarCuentas',
        dataSrc: ''
    },
    columns: [
        { data: null },
        { data: 'local.email' },
        { data: 'local.password' },
        { data: 'local.role' },
        { data: 'accion' }
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
        },
        order: [[ 1, 'asc' ]]
    } );

    tabla.on( 'order.dt search.dt', function () {
        tabla.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    // $('form').submit(function(event) {
    //
    //   var formData = {
    //       'name'        : $('input[name="name"]').val(),
    //       'password'    : $('input[name="password"]').val(),
    //       'role'        : $('select[name="role"]').val()
    //   };
    //
    //   $.ajax({
    //       type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
    //       url         : '/adminsignup', // the url where we want to POST
    //       data        : formData, // our data object
    //       encode      : true,
    //     })
    //       // using the done promise callback
    //     .done(function(data) {
    //       console.log(data);
    //       tabla.clear();
    //       tabla.rows.add(data);
    //       tabla.draw();
    //     });
    //
    //   event.preventDefault();
    // });

    // var role = $('select[name="role"]');
    // role.on('change', function(){
    //   if(role.val() === 'Moderador'){
    //     $.ajax({
    //       type: 'post',
    //       url: '/empleados',
    //     }).done(function(data){
    //       data.empleados.forEach(function(item, index){
    //         var form = $('#formulario');
    //         form.append('<div class="col-md-3">\
    //                     <select class="form-control" name="empleado">\
    //                     </select>\
    //                     </div>');
    //         $('select[name="empleado"]').append('<option value="'+ item.cedula + '">'+ item.nombre +' ' + item.apellido + '</option>');
    //       });
    //     });
    //   }
    // });

});
