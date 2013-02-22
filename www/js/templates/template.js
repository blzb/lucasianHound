(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['articuloTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "		<img src=\"";
  foundHelper = helpers.baseURL;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.baseURL; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/articulos/";
  stack1 = depth0.articulo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idArticulo;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/imagen.jpg\" style=\"max-width:100%;\"/>\r\n		<p>";
  stack1 = depth0.articulo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.detalle;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\r\n		<h2>Precio:$";
  stack1 = depth0.articulo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.precio;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h2>\r\n";
  return buffer;});
templates['comentariosForm'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "			<div id=\"erroresComentariosForm\"></div>\r\n			<form id=\"comentariosForm\">\r\n				<ul data-role=\"listview\" data-inset=\"true\" id=\"comentariosFormListView\">\r\n					<li data-role=\"fieldcontain\">\r\n						<label for=\"comentarioNombre\">Nombre:</label>\r\n						<input type=\"text\" name=\"comentarioNombre\" id=\"comentarioNombre\"\r\n						class=\"required\" /></li>\r\n					<li data-role=\"fieldcontain\">\r\n						<label for=\"comentarioEmail\">Email:</label>\r\n						<input type=\"text\" name=\"comentarioEmail\" id=\"comentarioEmail\"\r\n						class=\"required email\" />\r\n						</li>\r\n					<li data-role=\"fieldcontain\">\r\n						<label for=\"comentarioTelefono\">Telefono:</label>\r\n						<input type=\"text\" name=\"comentarioTelefono\"\r\n						id=\"comentarioTelefono\" class=\"digits\" minlength=\"8\"\r\n						maxlength=\"12\" />\r\n					</li>\r\n					<li data-role=\"fieldcontain\">\r\n					<label for=\"comentarioComentario\">Comentario:</label>\r\n					<textarea name=\"comentarioComentario\" id=\"comentarioComentario\"\r\n						class=\"required\"></textarea>\r\n						</li>\r\n					</ul>\r\n					<a href=\"\" data-role=\"button\" onclick=\"hound.enviarComentario();\">Enviar</a>\r\n			</form>";});
templates['encuestaTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\r\n			<fieldset data-role=\"controlgroup\" >\r\n			<li data-swatch=\"a\" class=\"ui-li ui-li-divider ui-btn ui-bar-a ui-corner-top\" data-role=\"list-divider\" role=\"\" data-form=\"ui-bar-a\">";
  foundHelper = helpers.pregunta;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.pregunta; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</li>\r\n			";
  foundHelper = helpers.respuestas;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(program2, data, depth0),data:data}); }
  else { stack1 = depth0.respuestas; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.respuestas) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program2, data, depth0),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</fieldset>\r\n		";
  return buffer;}
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\r\n     		<input type=\"radio\" name=\"pregunta";
  stack1 = depth1.idPregunta;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" id=\"respuesta";
  foundHelper = helpers.idRespuesta;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.idRespuesta; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" value=\"";
  foundHelper = helpers.idRespuesta;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.idRespuesta; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" checked=\"true\"/>\r\n     		<label for=\"respuesta";
  foundHelper = helpers.idRespuesta;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.idRespuesta; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.respuesta;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.respuesta; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</label>\r\n			";
  return buffer;}

  buffer += "		";
  foundHelper = helpers.encuesta;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.encuesta; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.encuesta) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		<a href=\"\" data-role=\"button\" onclick=\"hound.enviarEncuesta()\">Contestar</a>\r\n";
  return buffer;});
templates['listArticulosTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li><a onclick=\"hound.getArticulo(";
  stack1 = depth0.articulo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idArticulo;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ");\" href=\"\" id=\"articulo";
  stack1 = depth0.articulo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idArticulo;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"><img src=\"";
  foundHelper = helpers.baseURL;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.baseURL; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "articulos/";
  stack1 = depth0.articulo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idArticulo;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/icono.jpg\" class=\"ui-li-icon\"/><span>";
  stack1 = depth0.articulo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nombre;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</span><p>";
  stack1 = depth0.articulo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.descripcion;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p></a></li>";
  return buffer;});
templates['listCategoriasTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "				<li><a onclick=\"hound.getArticulos(";
  stack1 = depth0.categoria;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idCategoria;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ");\" href=\"\" id=\"categoria";
  stack1 = depth0.categoria;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idCategoria;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"><img src=\"";
  foundHelper = helpers.baseURL;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.baseURL; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "categorias/";
  stack1 = depth0.categoria;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idCategoria;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "/icono.png\" class=\"ui-li-icon\"/><span>";
  stack1 = depth0.categoria;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nombre;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</span> <span class=\"ui-li-count\">";
  stack1 = depth0.categoria;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.numeroArticulos;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</span></a></li>";
  return buffer;});
templates['listContactosTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "				<li>\r\n					<img src=\"images/telefono-y-correo.jpg\" class=\"ui-li-icon\"/>\r\n						<h3>";
  stack1 = depth0.contacto;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nombre;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3>\r\n					<br/>\r\n					<span class=\"\">";
  stack1 = depth0.contacto;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.direccion;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</span>\r\n						<br/>\r\n					<span class=\"\">";
  stack1 = depth0.contacto;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.email;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</span>\r\n						<br/>\r\n					<span class=\"\">";
  stack1 = depth0.contacto;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.telefono;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</span>\r\n						<br/>\r\n				</li>\r\n";
  return buffer;});
templates['listEncuestasTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "				<li><a onclick=\"hound.getEncuesta(";
  stack1 = depth0.encuesta;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idEncuesta;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ");\" href=\"\" id=\"encuesta";
  stack1 = depth0.encuesta;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idEncuesta;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"><h3>";
  stack1 = depth0.encuesta;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nombre;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3><p>";
  stack1 = depth0.encuesta;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.descripcion;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p></a></li>";
  return buffer;});
templates['listPromocionesTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li><a onclick=\"hound.getPromocionOffline(";
  stack1 = depth0.promocion;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idPromocion;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ");\" href=\"\" id=\"promocion";
  stack1 = depth0.promocion;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idPromocion;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"><img src=\"data:image/jpeg;base64,";
  stack1 = depth0.promocion;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.icono;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"ui-li-icon\"/><h3>";
  stack1 = depth0.promocion;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nombre;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3><p>";
  stack1 = depth0.promocion;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.descripcion;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p></a></li>";
  return buffer;});
templates['listTiendasTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li><a onclick=\"hound.displayTienda(";
  stack1 = depth0.tienda;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idTienda;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + ");\" href=\"\" id=\"tienda";
  stack1 = depth0.tienda;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.idTienda;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"><h3>";
  stack1 = depth0.tienda;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nombre;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3><p>";
  stack1 = depth0.tienda;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.direccion;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p> </a></li>";
  return buffer;});
templates['promocionTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "		<img src=\"data:image/jpeg;base64,";
  stack1 = depth0.promocion;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.imagen;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" style=\"max-width:100%;\"/>\r\n		<p>";
  stack1 = depth0.promocion;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.detalle;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</p>\r\n		<h2>Vigencia: ";
  stack1 = depth0.promocion;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.vigencia;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h2>\r\n";
  return buffer;});
})();
