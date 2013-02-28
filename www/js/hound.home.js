document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    $("#jqueryStyle").html(localStorage.getItem("tema"));	
    hound.loadApp();
	hound.pushRegistration();
    hound.displayMainMenu();
    hound.validateComentario();
};
$(document).bind(
    "pagechange",
    function(e, data) {
        if (typeof data.toPage === "object") {
            if (data.toPage.attr("id") === "Comentarios") {
                $.mobile.showPageLoadingMsg("a",
                    "Descargando Actualizaciones", false);
                if (hound.errores) {
                    hound.errores.resetForm();
                }
                $('#comentariosForm').reset();
                $.mobile.hidePageLoadingMsg();
            } else if (data.toPage.attr("id") === "Catalogo") {
                $("#contenidoCatalogo").slideDown();
                $("#listCatalogos").listview("refresh");
            } else if (data.toPage.attr("id") === "Contactos") {
                $("#contenidoContactos").slideDown();
                $("#listContactos").listview("refresh");
            } else if (data.toPage.attr("id") === "Articulos") {
                $("#contenidoArticulos").slideDown();
                $("#listArticulos").listview("refresh");
                $("#contenidoArticulo").slideDown();
            } else if (data.toPage.attr("id") === "Articulo") {
                $("#contenidoArticulo").slideDown();
            } else if (data.toPage.attr("id") === "Encuestas") {
                $("#listEncuestas").slideDown();
                $("#listEncuestas").listview("refresh");
            } else if (data.toPage.attr("id") === "Encuesta") {
                $("#contenidoEncuesta").slideDown();
            } else if (data.toPage.attr("id") === "Promociones") {
                $("#listPromociones").listview("refresh");
                $("#contenidoPromociones").slideDown();
            } else if (data.toPage.attr("id") === "Promocion") {
                $("#contenidoPromocion").slideDown();
            } else if (data.toPage.attr("id") === "listaLocalizador") {
                $("#contenidoListaLocalizador").slideDown();
                $("#listListaLocalizador").listview("refresh");
            } else if(data.toPage.attr("id")==="Comentarios"){
                $("#comentariosFormListView").listview("refresh");
            }
            if (data.toPage.attr("id") === "Mapa") {

            } else {
                $.mobile.hidePageLoadingMsg();
            }
        }
    });
