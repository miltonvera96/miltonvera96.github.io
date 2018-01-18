$(document).ready(function(){

    // process the form
    $('form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'anio'        : $('select[name=anio]').val(),
            'mes'         : $('select[name=mes]').val(),
            'tipo'        : $('select[name=tipo]').val()
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/buscarReservas', // the url where we want to POST
            data        : formData, // our data object
            datatype: 'json', // what type of data do we expect back from the server
            encode      : true,
          })
            // using the done promise callback
          .done(function(data) {
                // log data to the console so we can see
                var datos = data[0];
                var tbody = $('#cuerpoReservas');
                tbody.empty();
                for(var i = 0; i < datos.length; i++){
                  var fila = $("<tr></tr>");
                  var d = $("<td></td>").text(datos[i]['fechaC']);
                  var d1 = $("<td></td>").text(datos[i]['hora']);
                  var d2 = $("<td></td>").text(datos[i]['descripcion']);
                  var d3 = $("<td></td>").text(datos[i]['estado']);
                  var d4 = $("<td></td>").text(datos[i]['empleado']);
                  var d5 = $("<td>$$$</td>");
                  var a1 = $("<a></a>").text("Editar");
                    a1.attr("href", "reservaciones/editar/" + datos[i]['idcita']);
                    a1.attr("role", "button");
                    a1.addClass("btn btn-info editar");
                  var d6 = $("<td></td>").append(a1);
                  var a2 = $("<a></a>").text("Eliminar");
                    a2.attr("href", "reservaciones/eliminar/" + datos[i]['idcita']);
                    a2.attr("role", "button");
                    a2.addClass("btn btn-danger eliminar");
                  var d7 = $("<td></td>").append(a2);
                  fila.append(d, d1, d2, d3, d4, d5, d6, d7);
                  tbody.append(fila);
                }
          });

                // here we will handle errors and validation messages
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

  $("tbody").on("click","a[class$='eliminar']", function(e) {
    e.preventDefault();
    var r = confirm("Desea eliminar este registro?");
    if (r == true) {
      var id = this.href;
      console.log(id);
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
});
