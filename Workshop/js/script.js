

//Para guardar la noticia en el LocalStorage, necesito definir un objeto literal o una funcion de construccion para convertirla en objeto

var noticias = [];

//Con esta funcion me traigo las noticias que estan guardadas en el LocalStorage
function getNoticias() {

    var datos = localStorage.getItem("noticias"); //Recupero del LocalStorage los objetos de "noticias" en forma de string

    if (datos !== null) {

        noticias = JSON.parse(datos);//Tomo el array "noticias" del LocalStorage en forma de string y lo convierto en un array de objetos "Noticia"

    }

}

function Noticia(titulo, descripcion, imagen, categoria){
    
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

function vincularElementos() {

    $("#boton").click(function () {

        var noticia = new Noticia($("#titulo").val(),  
                                  $("#descripcion").val(),
                                  $("#imagen").val(), 
                                  $("#categoria").val());

        noticias.push(noticia);

        localStorage.setItem("noticias", JSON.stringify(noticias));

        var noticiaTemplate = $("#noticia-template").html();
        var li = $(noticiaTemplate);// Esto nos devuelve un objeto de jQuery que contiene el HTML

        li.find("h3").text(noticia.titulo);
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
    })

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

var noticiaTemplate = $("#noticia-template").html(); //Me va a traer el html del tag con la clase "noticia-template" y se lo va a asignar a la variable noticiaTemplate en forma de string

var li = $(noticiaTemplate); //jQuery va a tomar el string y lo va a convertir en un objeto de HTML y se lo asigna a la variable



