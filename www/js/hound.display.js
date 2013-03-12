hound.displayMenuItem = function(nombre) {
    $(".texto" + nombre).text(eval("hound.portada.texto" + nombre));
    $("#titulo" + nombre).text(eval("hound.portada.texto" + nombre));
};
hound.displayMainMenu = function() {
    $("#tituloMenuPrincipal").text(hound.config.appDisplayName);
    hound.displayMenuItem("Contactos");
    hound.displayMenuItem("Localizador");
    hound.displayMenuItem("Promociones");
    if(hound.isConnected()){
        hound.displayMenuItem("Catalogo");
        hound.displayMenuItem("Comentarios");
        hound.displayMenuItem("Encuesta");            
        $(".imagenCatalogo").attr("src",localStorage.getItem("imagenCatalogo"));
        $(".imagenComentarios").attr("src",localStorage.getItem("imagenComentarios"));
        $(".imagenEncuesta").attr("src",localStorage.getItem("imagenEncuesta"));
    }
    $(".imagenLocalizador").attr("src",localStorage.getItem("imagenLocalizador"));
    $(".imagenContactos").attr("src",localStorage.getItem("imagenContactos"));
    $(".imagenPromociones").attr("src",localStorage.getItem("imagenPromociones"));

};
hound.displayCategorias = function() {
    $("#listCatalogos").html("");
    var template = Handlebars.templates['listCategoriasTemplate'];
    var contenido = "";
    for ( var i in hound.categorias) {
        var item = hound.categorias[i];
        contenido += template({
            baseURL : hound.config.remote_server_files,
            categoria : item
        });
    }
    $("#listCatalogos").html(contenido).trigger("create");

};
hound.displayContactos = function() {
    $("#listContactos").html("");
    var template = Handlebars.templates['listContactosTemplate'];
    for ( var i in hound.contactos) {
        var item = hound.contactos[i];
        $("#listContactos").append(template({
            baseURL : hound.config.remote_server_files,
            contacto : item
        }));
    }

};
hound.displayArticulos = function() {
    $("#listArticulos").html("");
    var template = Handlebars.templates['listArticulosTemplate'];
    for ( var i in hound.articulos) {
        var item = hound.articulos[i];
        $("#listArticulos").append(template({
            baseURL : hound.config.remote_server_files,
            articulo : item
        }));
    }
};
hound.displayArticulo = function() {
    $("#contenidoArticulo").html("");
    var template = Handlebars.templates['articuloTemplate'];
    $("#contenidoArticulo").html(template({
        baseURL : hound.config.remote_server_files,
        articulo : hound.articulo
    }));
    $("#tituloArticulo").html(hound.articulo.nombre);
};
hound.displayPromociones = function() {
    $("#listPromociones").html("");
    var template = Handlebars.templates['listPromocionesTemplate'];
    for ( var i in hound.promociones) {
        var item = hound.promociones[i];
        var itemDate = new Date(item.vigencia);
        var currentDate = new Date();
        if (currentDate <= itemDate) {
            var itemYear = itemDate.getFullYear();
            var itemMonth = itemDate.getMonth();
            item.vigencia = itemDate.getDate() + " de "
            + hound.meses[itemMonth] + " del " + itemYear;
            $("#listPromociones").append(template({
                promocion : item,
            }));
        }
    }
};
hound.displayPromocion = function() {
    $("#contenidoPromocion").html("");
    var template = Handlebars.templates['promocionTemplate'];
    $("#contenidoPromocion").html(template({
        promocion : hound.promocion
    }));
    $("#tituloPromocion").html(hound.promocion.nombre);
};
hound.displayEncuestas = function() {
    $("#tituloEncuestas").html(hound.portada.textoEncuesta);
    $("#listEncuestas").html("");
    var template = Handlebars.templates['listEncuestasTemplate'];
    for ( var i in hound.encuestas) {
        var item = hound.encuestas[i];
        if (item.vigencia > new Date()) {
            $("#listEncuestas").append(template({
                baseURL : hound.config.remote_server_files,
                encuesta : item
            }));
        }
    }
};
hound.displayEncuesta = function() {
    $("#contenidoEncuesta").html("");
    var template = Handlebars.templates['encuestaTemplate'];
    $("#contenidoEncuesta").html(template({
        baseURL : hound.config.remote_server_files,
        encuesta : hound.preguntas
    })).trigger("create");
};
hound.displayTiendas = function() {
    $.mobile.showPageLoadingMsg();
    //$("#contenidoListaLocalizador").hide();
    $("#listListaLocalizador").html("");
    var template = Handlebars.templates['listTiendasTemplate'];
    for ( var i in hound.tiendas) {
        var item = hound.tiendas[i];
        $("#listListaLocalizador").append(template({
            tienda : item
        }));
    }
    var masCercana = {
        'idTienda':'-1', 
        'nombre':'Ubicación mas cercana', 
        'direccion':''
    };
    $("#listListaLocalizador").append(template({
        tienda : masCercana
    }));

    $.mobile.changePage("#listaLocalizador");
}
hound.displayTienda = function(idTienda) {
    if(idTienda==-1){
        window.open(encodeURI('https://maps.google.com/'), '_system');
    }else{
        var tienda = hound.tiendas[idTienda];
        var queryUrl = 'https://maps.google.com/maps?z=14&t=m&q=loc:'+tienda.latitud
        +'+'+tienda.longitud
        +'('+tienda.nombre
        +':'+tienda.direccion
        +')';    
        window.open(encodeURI(queryUrl), '_system');
    }
/*
    $.mobile.changePage("#Mapa");
    directionsDisplay.setDirections({
        routes: []
    });
    var latlngTienda = new google.maps.LatLng(hound.tiendas[idTienda].latitud,
        hound.tiendas[idTienda].longitud);
    var latlngActual = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);
    for ( var i = 0; i < marcadores.length; i++) {			
        marcadores[i].setMap(null);
    }
    var latlngbounds=  new google.maps.LatLngBounds(null);
    marcadores.length = 0;
		
    var marcadorTienda = new google.maps.Marker({
        position : latlngTienda,
        map : map,
        title : hound.tiendas[idTienda].nombre
    });
    marcadores.push(marcadorTienda);		
    var marcadorActual = new google.maps.Marker({
        position : latlngActual,
        map : map,
        title : "actual"
    });
    marcadores.push(marcadorActual);
    latlngbounds = new google.maps.LatLngBounds();
    latlngbounds.extend(latlngTienda);
    latlngbounds.extend(latlngActual);
    map.fitBounds(latlngbounds);
    var request = {
        origin : hound.currentPosition,
        destination : latlngTienda,
        travelMode : google.maps.TravelMode.DRIVING
    };		
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });	*/	
}
hound.displayFormularioComentarios = function(){
    $("#contenidoComentarios").html("");
    var template = Handlebars.templates['comentariosForm'];
    $("#contenidoComentarios").append(template());
    $.mobile.changePage("#Comentarios");	
}