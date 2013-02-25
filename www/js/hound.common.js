jQuery.fn.reset = function() {
    $(this).each(function() {
        this.reset();
    });
};
map = new Object();
$.mobile.defaultPageTransition = "slide";
$.mobile.page.prototype.options.backBtnText = "Atras";
$.mobile.page.prototype.options.addBackBtn = true;
hound = {
    meses : new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
        "Diciembre"),
    config : {},
    updateables : {
        portada: 0,
        tiendas: 0,
        promociones: 0,
        tema: 0,
        contactos: 0,
        imagenCatalogo: 0,
        imagenComentarios: 0,
        imagenContactos: 0,
        imagenEncuesta: 0,
        imagenLocalizador: 0,
        imagenPromociones: 0
    },
    nuevas_versiones : "",
    repeticion : '',
    portada : {},
    categoriaActual : {},
    errores : {},
    mapInitialized : false,
    categorias : {},
    validateComentario : function() {
        hound.errores = $("#comentariosForm").validate({
            submitHandler : function(form) {
                hound.enviarComentario();
            },
            messages : {
                comentarioNombre : {
                    required : "Por favor especifica tu nombre"
                },
                comentarioEmail : {
                    required : "Por favor especifica tu email",
                    email : "Por favor introduce un email valido"
                },
                comentarioTelefono : {
                    digits : "Por favor introduce solo numero",
                    minlength : "Por favor introduce 8 digitos como minimo",
                    maxlenght : "Por favor introduce 12 digitos como maximo"
                },
                comentarioComentario : {
                    required : "Por favor escribe un comentario"
                }
            }
        });
    },
    loadApp : function() {
        hound.portada = JSON.parse(localStorage.getItem("portada"));
        hound.nuevas_versiones = JSON.parse(localStorage.getItem("versiones"));
        hound.tiendas = JSON.parse(localStorage.getItem("tiendas"));
    },
    inicializaMapa : function() {
        $.mobile.showPageLoadingMsg();

        navigator.geolocation.getCurrentPosition(function(position) {
            hound.currentPosition = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude);
            directionsService = new google.maps.DirectionsService();

            var myOptions = {
                zoom : 14,
                center : hound.currentPosition,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                minZoom : 12
            };
            if (!hound.mapInitialized) {
                map = new google.maps.Map(
                    document.getElementById("map_canvas"), myOptions);
                directionsDisplay = new google.maps.DirectionsRenderer({
                    suppressMarkers : false,
                    panel : document.getElementById("map_directions"),
                    map : map
                });
            }
            marcadores = new Array();
            var puntos = new Array();
            var ids = new Array();
            for ( var i in hound.tiendas) {
                puntos.push(new google.maps.LatLng(hound.tiendas[i].latitud,
                    hound.tiendas[i].longitud));
                ids.push(hound.tiendas[i].idTienda);
            }

            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins : [ hound.currentPosition ],
                destinations : puntos,
                travelMode : google.maps.TravelMode.DRIVING,
                avoidHighways : false,
                avoidTolls : false
            }, callback);

            function callback(response, status) {
                var results = response.rows[0].elements;
                var menor = {
                    id : -1,
                    distancia : 100000000000
                };
                for ( var j = 0; j < results.length; j++) {
                    var element = results[j];
                    if (menor.distancia > element.distance.value) {
                        menor.id = ids[j];
                        menor.distancia = element.distance.value;
                    }
                }
                hound.cercano = menor;
                $.mobile.hidePageLoadingMsg();
                $.mobile.changePage("#opcionesLocalizador");
            }
            hound.mapInitialized = true;
        });
    }
}
hound.infoLog= function(mensaje){
    $("#mensajes").prepend(mensaje+"<br/>");
};
hound.errorHandler= function(error, params, errorDisplay){
    var display="";	
    switch(error.status){
        case 404:
            display+="recurso no encontrado";
            break;
        case 500:
            display+="error del servidor";
            break;
        case 0:
            switch(error.statusText){
                case "timeout":
                    display+="tiempo agotado";
                    break;
                case "error":
                    display+="error desconocido";
                    break;
            }
            break;              
    }    
    display = params.mensajeError+':'+display+'...reintentando'+params.tryCount;
    params.tryCount++;
    if (params.tryCount <= params.retryLimit) {        
        errorDisplay(display);
        $.ajax(params);        
    }else{
        params.retryExceeded();
    }
};
hound.errorPrint = function(mensaje){
    $("#mensajes").prepend('<span style="color:red">'+mensaje+' <br/></span>');
}
hound.infoAlert = function(titulo, mensaje){
    if(navigator.notification){
        navigator.notification.alert(
            mensaje,
            function(){
            },
            titulo,
            'OK' 
            );  
    }else{
        alert(mensaje);
    }
    };
hound.errorAlert = function(mensaje){	
    if(navigator.notification){
        navigator.notification.vibrate(500);
        navigator.notification.alert(
            mensaje,
            function(){
                $.mobile.hidePageLoadingMsg();
                $.mobile.changePage("#menuPrincipal");
            },
            'Error',
            'OK' 
            );        
    }else{
        alert(mensaje);
        $.mobile.hidePageLoadingMsg();
        $.mobile.changePage("#menuPrincipal");

    }
};
hound.isDisplayable = function(){
    return (localStorage.portada && localStorage.tiendas
        && localStorage.promociones && localStorage.tema
        && localStorage.contactos && localStorage.imagenCatalogo && localStorage.imagenComentarios 
        && localStorage.imagenContactos && localStorage.imagenEncuesta
        && localStorage.imagenLocalizador && localStorage.imagenPromociones);    
}