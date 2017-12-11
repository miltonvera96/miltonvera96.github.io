
/*
- Listener: Al terminar la carga de la página

Agregar la redirección el contenido a wikipedia: https://es.wikipedia.org/wiki/Asesinato_en_el_Orient_Express
al evento click del botón "Ver página de wikipedia"
*/

/*
- Listener: Al terminar la carga de la página

Agregar el contenido del archivo horarios.js
*/
function makeRequestJ(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
                http_request.overrideMimeType('application/json');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { }
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }


    http_request.onreadystatechange = ContentsJ;
    http_request.open('GET', url, true);
    http_request.send(null);

}


function ContentsJ() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            /*Aquí deben procesar el JSON y mostrar la respuesta en el HTML
            Utilice JSON.parse() para convertir la respuesta en un objeto
            */

            let respuesta = JSON.parse(http_request.response);
            //console.log(respuesta);
            var tbody = document.getElementById("cuerpotabla-reservaciones");
            var cont = 1;
            for (clave1 in respuesta) {
                var funcion = respuesta[clave1];
                //console.log(funcion);
                var newtr = document.createElement("tr");
                //newtr.setAttribute('class', 'cebra1'); //se creo la clase cebra1 .cebra1:nth-child(odd){background-color:#f2f2f2;}
                tbody.appendChild(newtr);
                var newtd0 = document.createElement("td");
                let newtxt0 = document.createTextNode(cont);
                newtd0.appendChild(newtxt0);
                newtr.appendChild(newtd0);
                for (clave in funcion) {
                    var newtd = document.createElement("td");
                    let valor = funcion[clave];
                    let newtxt = document.createTextNode(valor);
                    newtd.appendChild(newtxt);
                    newtr.appendChild(newtd);
                }
                cont = cont + 1;
            }

        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}



makeRequestJ('data/reservaciones.js');
