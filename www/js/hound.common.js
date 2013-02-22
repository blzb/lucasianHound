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
hound.errorLog= function(mensaje, status, error){
	$("#mensajes").prepend('<span style="color:red">'+status+'('+error+')'+mensaje+'<br/></span>');
};
hound.infoAlert = function(mensaje){
};
hound.errorAlert = function(mensaje, status, error){
	
};