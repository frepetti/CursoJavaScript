

//Para guardar la noticia en el LocalStorage, necesito definir un objeto literal o una funcion de construccion para convertirla en objeto

var noticias = []; //Variable Global. Va a ser utilizada por varias funciones

//Con esta funcion me traigo las noticias que estan guardadas en el LocalStorage
function getNoticias() {

    var datos = localStorage.getItem("noticias"); //Recupero del LocalStorage los objetos de "noticias" en forma de string

    if (datos !== null) {

        noticias = JSON.parse(datos);//Tomo el array "noticias" del LocalStorage en forma de string y lo convierto en un array de objetos "Noticia"

    }

}

//Funcion de construccion
function Noticia(id, titulo, descripcion, imagen, categoria) {

    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.categoria = categoria;
}

//Con esta funcion voy a tomar los atributos de los elementos del array "noticias" y los voy a plasmar en el HTML
function dibujarNoticias() {

    for (var i = 0; i < noticias.length; i++) {

        var noticiaTemplate = $("#noticia-template").html(); //Me va a traer el html del tag con la clase "noticia-template" y se lo va a asignar a la variable noticiaTemplate en forma de string

        var li = $(noticiaTemplate); //jQuery va a tomar el string y lo va a convertir en un objeto de HTML y se lo asigna a la variable

        li.find("h3").text(noticias[i].titulo);
        li.find("h4").text(noticias[i].categoria);
        li.find("p").text(noticias[i].descripcion);
        li.find("img").attr("src", noticias[i].imagen);
        li.appendTo("#noticias");


    }

}

//Opcion 1
/*
var id = 0; //Variable global, cualquier funcion puede acceder a ella
*/

function generarIdLocalStorage() {
    var id = 0;
    var dato = localStorage.getItem("id");//Busco el objeto "id" en el LocalStorage, si no lo encuentra, id=0

    if (dato !== null) {
        id = parseInt(dato) + 1;
    }
    localStorage.setItem("id", id);//Subo el objeto "id" al LocalStorage con su valor
    return id;
}

//Opcion 2

function generarIdLastChild() {

    var id = 0;

    if ($("li:last-child").attr("id") !== undefined) {//Porque el last-child no esta definido en la primera iteracion.
        id = parseInt($("li:last-child").attr("id")) + 1;
    }

    return id;
}

//Ordenar Noticias
//Lo mas simple es borrar las noticias ya dibujadas en el sitio y volver a escribirlas ordenadas.


//Funciones con el criterio para ordenar
function ordenarPorTituloAsc(noticiaA, noticiaB) {
    var resultado = 0; //Son iguales
    if (noticiaA.titulo > noticiaB.titulo) {//noticiaA mayor a noticiaB
        resultado = 1;
    }

    if (noticiaA.titulo < noticiaB.titulo) { //noticiaA menor a noticiaB
        resultado = -1;
    }
    return resultado;
}

function ordenarPorTituloDes(noticiaA, noticiaB) {
    var resultado = 0; //Son iguales
    if (noticiaA.titulo > noticiaB.titulo) {
        resultado = -1;
    }

    if (noticiaA.titulo < noticiaB.titulo) {
        resultado = 1;
    }
    return resultado;
}

function ordenarPorID(noticiaA, noticiaB) {
    var resultado = 0; //Son iguales
    if (noticiaA.id > noticiaB.id) {
        resultado = 1;
    }

    if (noticiaA.id < noticiaB.id) {
        resultado = -1;
    }
    return resultado;
}





//Esta funcion va a crear las noticias nuevas
function vincularElementos() {

    $("#boton").click(function () {
        //Gnerar un ID
        //var id = generarIdLocalStorage(); //Opcion 1
        var id = generarIdLastChild(); //Opcion 2

        //Validar que el formulario este completo
        if ($("#titulo").val() === "" || $("#descripcion").val() === "" || $("#imagen").val() === "") {
            alert("Por favor complete todos los campos");
        } else {
            //Crear el objeto noticia tomando los valores ingresados en el formulario
            var noticia = new Noticia(id,
                $("#titulo").val(),
                $("#descripcion").val(),
                $("#imagen").val(),
                $("#categoria").val());

            noticias.push(noticia);

            localStorage.setItem("noticias", JSON.stringify(noticias));

            var noticiaTemplate = $("#noticia-template").html(); //Me lo guarda como string
            var li = $(noticiaTemplate);// Esto nos devuelve un objeto de jQuery que contiene el HTML

            li.attr("id", id);
            li.find("h3").text(noticia.titulo);//Encuentra el elemento h3 y asigna el atributo titulo del objeto noticia
            li.find("h4").text(noticia.categoria);
            li.find("p").text(noticia.descripcion);
            li.find("img").attr("src", noticia.imagen);
            li.appendTo("#noticias");

            /*

            //Si no usara el template, tendria que crear el li de la siguiente manera, pasandole los atributos del objeto noticias.
            $("<li/>").text(noticias[i].titulo +
                            noticias[i].descripcion +
                            noticias[i].imagen +
                            noticias[i].categoria).appendTo("#noticias");
            */

        }

    })

    $("#ordenarPorAZ").click(function () {

        noticias.sort(ordenarPorTituloAsc);//Le paso la funcion de ordenar como callback del sort
        $("#noticias").empty();//Borro el contenedor "noticias"
        dibujarNoticias();//Vuelvo a dibujar todas las noticias ya ordenadas

    });

    $("#ordenarPorZA").click(function () {

        noticias.sort(ordenarPorTituloDes);
        $("#noticias").empty();
        dibujarNoticias();
    });

    $("#ordenarPorId").click(function () {

        noticias.sort(ordenarPorID);
        $("#noticias").empty();
        dibujarNoticias(); 

    });

}


function iniciarPagina() {

    getNoticias();
    dibujarNoticias();
    vincularElementos();

}


$(document).ready(iniciarPagina);

/*
    Guardar las noticias
    LocalStorage
    JSON
*/

/*
$("#boton-borrar").click(function () {
    
})
*/



