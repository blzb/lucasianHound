hound.updateCompleted=function(){
    $.mobile.hidePageLoadingMsg();
    window.location = "home.html";
}

hound.isConnected= function() {    
    if(navigator.network){
        var networkState = navigator.network.connection.type;
        if(networkState == Connection.UNKNOWN || networkState==Connection.NONE){
            return false;
        }else{
            return true;
        }
    }else{
        return true;
    }
}
hound.enviarComentario = function(intentos) {
    if ($("#comentariosForm").valid()) {
        $.mobile.showPageLoadingMsg("a", "Descargando Actualizaciones",
        false);
        var comentarioJSON = {};
        comentarioJSON.nombre = $("#comentarioNombre").val();
        comentarioJSON.email = $("#comentarioEmail").val();
        comentarioJSON.telefono = $("#comentarioTelefono").val();
        comentarioJSON.comentario = $("#comentarioComentario").val();
        $.ajax({
            type : "POST",
            url : this.config.remote_server
                + hound.nuevas_versiones.comentarioHref,
            data : JSON.stringify(comentarioJSON),
            contentType : "application/json",
            timeout : 30000,
            success : function(data) {
                hound.infoAlert("Gracias","Tu comentario ha sido enviado");
                $.mobile.hidePageLoadingMsg();
                $.mobile.changePage("#menuPrincipal");
            },
            error : function(xhr,status, error) {
                hound.errorLog("Envio comentario:"+item.idPromocion,xhr);
            }
        });
    }
};
hound.updateApp = function(intentos) {
    hound.infoLog("Obteniendo versiones...");
    $.ajax({	
        type : "GET",
        url : this.config.remote_server + this.config.appName
            + "/versiones",
        cache : false,
        dataType : "text",
        success : function(data) {
            hound.infoLog("Versiones obtenidas..");
            hound.nuevas_versiones = JSON.parse(data);
            if (localStorage.getItem("versiones")) {
                var versiones = JSON.parse(localStorage
                .getItem("versiones"));
                var actualizacion = new Array();
                if (versiones.versionContacto != hound.nuevas_versiones.versionContacto) {				
                    actualizacion.push("contactos");
                    localStorage.removeItem("contactos");
                    hound.getContactos();
                }
                if (versiones.versionPortada != hound.nuevas_versiones.versionPortada) {
                    actualizacion.push("portada");
                    localStorage.removeItem("portada");
                    hound.getPortada();
                }
                if (versiones.versionPromociones != hound.nuevas_versiones.versionPromociones) {
                    actualizacion.push("promociones");
                    localStorage.removeItem("promociones");
                    hound.getPromociones();
                }
                if (versiones.versionTema != hound.nuevas_versiones.versionTema) {
                    actualizacion.push("tema");
                    localStorage.removeItem("tema");
                    hound.getTema();
                }
                if (versiones.versionTiendas != hound.nuevas_versiones.versionTiendas) {
                    actualizacion.push("tiendas");
                    localStorage.removeItem("tiendas");
                    hound.getTiendas();
                }
            } else {
                hound.getContactos();
                hound.getPortada();
                hound.getPromociones();
                hound.getTema();
                hound.getTiendas();
            }
            hound.repeticion = setInterval("hound.verifyUpdatesCompleted()", 1000);
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
            if(hound.isDisplayable()){
                hound.updateCompleted();
            }
            else{
                    navigator.app.exitApp();
            }                
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 3000,
        mensajeError: "App update"
    })
};
hound.getContactos = function(intentos) {
    hound.infoLog("Obteniendo nuevos contactos..");
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.nuevas_versiones.contactosHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            hound.infoLog("Contactos obtenidos...");
            localStorage.setItem("contactos", data);
        },        
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
            if(hound.isDisplayable()){
                hound.updateCompleted();
            }
            else{
                if(navigator.app){
                    navigator.app.exitApp();
                }else{
                    hound.errorPrint("Reintentos excedidos");
                }
            }                
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Contactos "

    });
};
hound.getImagen= function(imagen,url){
    $.ajax({
        type : "GET",
        url : hound.config.remote_server_files
            + url+"large.dat",
        cache : false,
        dataType : "text",
        success: function(data){
            localStorage.setItem(imagen,data);
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 5000,
        mensajeError: "Imagen"
    });	
}
hound.getPortada = function(intentos) {
    hound.infoLog("Obteniendo menu principal..");
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.nuevas_versiones.portadaHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            localStorage.setItem("portada", data);
            hound.infoLog("Menu principal obtenido..");
            var portada=JSON.parse(data);
            for(var nombre in portada){
                if(nombre.indexOf("image")!=-1){					
                    hound.getImagen(nombre, portada[nombre]);
                }
            }
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Menu Inicial"
    });
};
hound.getPromociones = function(intentos) {	
    hound.infoLog("Obteniendo promociones..");
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.nuevas_versiones.promocionesHref,
        cache : false,
        dataType : "text",
        success : function(data) {										
            hound.infoLog("Promociones obtenidas..");
            hound.promociones=JSON.parse(data);				
            for (var i in hound.promociones) {						
                var item = hound.promociones[i];							
                hound.infoLog("Obteniendo promocion "+item.idPromocion+" ..");
                $.ajax({
                    type : "GET",	
                    async : false,
                    url : hound.config.remote_server_files + "/promociones/"+ item.idPromocion + "/imagen.dat",
                    cache : false,
                    dataType : "text",
                    success : function(data) {						
                        hound.infoLog("Imagen promocion "+item.idPromocion);
                        item.imagen=data;								
                    },
                    error : function(xhr,status, error) {
                        hound.errorHandler(xhr, this, hound.errorPrint);
                    },
                    retryExceeded: function(){
                    },
                    tryCount: 0,
                    retryLimit: 4,
                    timeout : 30000,
                    mensajeError: "Imagen Promocion"

                });					
                $.ajax({
                    type : "GET",	
                    async : false,
                    url : hound.config.remote_server_files + "/promociones/"+ item.idPromocion + "/icono.dat",
                    cache : false,
                    dataType : "text",
                    success : function(data) {						
                        hound.infoLog("Icono promocion "+item.idPromocion);
                        item.icono=data;								
                    },
                    error : function(xhr,status, error) {
                        hound.errorHandler(xhr, this, hound.errorPrint);
                    },
                    retryExceeded: function(){
                    },
                    tryCount: 0,
                    retryLimit: 4,
                    timeout : 30000,
                    mensajeError: "Icono Promocion"
                });					
                hound.promociones[i]=item;												
            }								
            localStorage.setItem("promociones",JSON.stringify(hound.promociones));														
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Promociones"
    });		
};
hound.getTema = function(intentos) {
    hound.infoLog("Obteniendo tema..");
    $
    .ajax({
        type : "GET",
        url : this.config.remote_server_files
            + hound.nuevas_versiones.temaHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            localStorage.setItem("tema", data);
            hound.infoLog("Tema obtenido..");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Tema"
    });
};
hound.getTiendas = function(intentos) {
    hound.infoLog("Obteniendo tiendas..");
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.nuevas_versiones.tiendasHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            localStorage.setItem("tiendas", data);
            hound.infoLog("Tiendas obtenidas..");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Tiendas"
    });
};
hound.getCategorias = function() {
    $.mobile.showPageLoadingMsg();
    $("#contenidoCatalogo").hide();
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.nuevas_versiones.categoriasHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            hound.categorias = JSON.parse(data);				
            hound.displayCategorias();
            $.mobile.changePage("#Catalogo");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
            hound.errorAlert(this.mensajeError+": "+this.retryLimit+" intentos fallidos, operacion abortada intenta mas tarde");
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Categorias"
    });
};
hound.getArticulos = function(idCategoria) {	
    $.mobile.showPageLoadingMsg();
    $("#contenidoArticulos").hide();
    $("#tituloArticulos").html(hound.categorias[idCategoria].nombre);
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.categorias[idCategoria].articulosHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            hound.articulos=JSON.parse(data);		
            hound.displayArticulos();
            $.mobile.changePage("#Articulos");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Articulos"
    });		
};
hound.getArticulo= function(idArticulo){
    $.mobile.showPageLoadingMsg();	
    $("#contenidoArticulo").hide();
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.articulos[idArticulo].href,
        cache : false,
        dataType : "text",
        success : function(data) {
            hound.articulo=JSON.parse(data);
            hound.displayArticulo();
            $.mobile.changePage("#Articulo");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Articulo "+idArticulo
    });		
};
hound.getPromocionesOffline = function() {		
    $.mobile.showPageLoadingMsg();
    $("#contenidoPromociones").hide();		
    hound.promociones=JSON.parse(localStorage.getItem("promociones"));
    hound.displayPromociones();
    $.mobile.changePage("#Promociones");
};				
hound.getPromocionOffline= function(idPromocion){
    $.mobile.showPageLoadingMsg();	
    $("#contenidoPromocion").hide();
    hound.promocion=hound.promociones[idPromocion];
    hound.displayPromocion();
    $.mobile.changePage("#Promocion");	
};	
hound.getEncuestas= function(){
    $.mobile.showPageLoadingMsg();
    $("#listEncuestas").hide();
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.nuevas_versiones.encuestasHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            hound.encuestas = JSON.parse(data);
            hound.displayEncuestas();
            $.mobile.changePage("#Encuestas");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Encuestas"

    });	
};
hound.getEncuesta= function(idEncuesta){
    $.mobile.showPageLoadingMsg();	
    $("#contenidoEncuesta").hide();
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.encuestas[idEncuesta].preguntasHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            hound.preguntas=JSON.parse(data);
            hound.encuesta = hound.encuestas[idEncuesta];
            $("#tituloEncuesta").html(hound.encuestas[idEncuesta].nombre);
            hound.displayEncuesta();
            $.mobile.changePage("#Encuesta");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Encuesta "+idEncuesta

    });	
};
hound.verifyUpdatesCompleted = function() {
    if (hound.isDisplayable()) {
        clearInterval(hound.repeticion);
        localStorage.setItem("versiones", JSON
        .stringify(hound.nuevas_versiones));
        this.updateCompleted();
    } 
};
hound.enviarEncuesta = function(){
    var encuestaJSON = {};
    var seleccionadas = $("input[name*=pregunta]:checked");
    for(var i = 0; i<seleccionadas.length;i++){
        encuestaJSON[seleccionadas[i].name.replace("pregunta","")]=seleccionadas[i].value;
    }
    $.ajax({
        type : "POST",
        url : this.config.remote_server
            + hound.encuesta.postHref,
        data : JSON.stringify(encuestaJSON),
        contentType : "application/json",
        timeout : 30000,
        success : function(data) {
            hound.infoAlert("Gracias", "Hemos recibido tus respuestas");
            $.mobile.hidePageLoadingMsg();
            $.mobile.changePage("#menuPrincipal");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Enviar encuesta"

    });
}
hound.getListContactos = function() {
    $.mobile.showPageLoadingMsg();
    $("#contenidoContactos").hide();
    $.ajax({
        type : "GET",
        url : this.config.remote_server
            + hound.nuevas_versiones.contactosHref,
        cache : false,
        dataType : "text",
        success : function(data) {
            hound.contactos = JSON.parse(data);
            hound.displayContactos();
            $.mobile.changePage("#Contactos");
        },
        error : function(xhr,status, error) {
            hound.errorHandler(xhr, this, hound.errorPrint);
        },
        retryExceeded: function(){
        },
        tryCount: 0,
        retryLimit: 4,
        timeout : 30000,
        mensajeError: "Contactos"
    });
};
hound.getContactosOffLine = function(){
    $.mobile.showPageLoadingMsg();
    $("#contenidoContactos").hide();		
    hound.contactos=JSON.parse(localStorage.getItem("contactos"));
    hound.displayContactos();
    $.mobile.changePage("#Contactos");	
}