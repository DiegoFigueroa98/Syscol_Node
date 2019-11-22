var seleccion = "";
var seleccion_datos = "";
var datos = [];
$(document).ready(function(){

//Métodos para el llenado de las tablas
function filas_tabla_nuevo_cliente(id_solicitud, nombre_completo, fecha, hora, estatus) {
	return `<tr id="${id_solicitud}">
			<td>${nombre_completo}</td>
			<td>${fecha}</td>
			<td>${hora}</td>
			<td>${estatus}</td>
	</tr>`
}
	
async function llenar_tabla_nuevo_cliente(route) {
	const response = await fetch(route)
	console.log(response);
	const result = await response.json()
	console.log(result);
	let tbody = $('#tbody_pendientes') 
	$.each(result.data, (i,row) => {
		$(filas_tabla_nuevo_cliente(row.id_solicitud, row.nombre_completo, row.fecha, row.hora_visita, row.estatus)).appendTo(tbody)
	}) 
	return result.error
}

function filas_tabla_nuevo_inmueble(id_solicitud, nombre_completo, fecha, hora, estatus) {
	return `<tr id="${id_solicitud}">
			<td>${nombre_completo}</td>
			<td>${fecha}</td>
			<td>${hora}</td>
			<td>${estatus}</td>
	</tr>`
}
	
async function llenar_tabla_nuevo_inmueble(route) {
	const response = await fetch(route)
	console.log(response);
	const result = await response.json()
	console.log(result);
	let tbody = $('#tbody_pendientes') 
	$.each(result.data, (i,row) => {
		$(filas_tabla_nuevo_inmueble(row.id_solicitud, row.nombre, row.fecha, row.hora_visita, row.estatus)).appendTo(tbody)
	}) 
	return result.error
}

function filas_tabla_nuevo_servicio(id_solicitud, nombre_completo, fecha, hora, estatus) {
	return `<tr id="${id_solicitud}">
			<td>${nombre_completo}</td>
			<td>${fecha}</td>
			<td>${hora}</td>
			<td>${estatus}</td>
	</tr>`
}
	
async function llenar_tabla_nuevo_servicio(route) {
	const response = await fetch(route)
	console.log(response);
	const result = await response.json()
	console.log(result);
	let tbody = $('#tbody_pendientes') 
	$.each(result.data, (i,row) => {
		$(filas_tabla_nuevo_servicio(row.id_solicitud, row.nombre, row.fecha, row.hora_visita, row.estatus)).appendTo(tbody)
	}) 
	return result.error
}

	//Mostrar únicamente la primera sección de la navegación de pestañas
	$('ul.tabs li a:first').addClass('active');
    $('.secciones article').hide();
	$('#ciz').hide();
	$('#usu_cont').hide();
	$('.secciones article:first').show();

	//Funcionalidades de la navegación de pestañas
	$('ul.tabs li a').click(function(){
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.secciones article').hide();

		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;
		
	});

	//Funcionalidad de los botones en general
	$('button').click(function(){
        switch($(this).attr('id')){
			case "btn_proceder":
				if (seleccion.length != 0) {
					detalles_elemento_seleccionado('/pendientes/elemento_seleccionado',{
						id_elemento: seleccion,
						tipo_solicitud: $('#solicitud option:selected').text()
					})
					$('#ver_detalle').modal('show');
					$('.secciones article').hide();
					$('#form_cotizar').show();
					$('#tabla_modal tbody tr td').each(function(){
						datos.push($(this).text());
					});
					console.log(datos);

				} else {
					alert("Error, seleccione una fila, por favor");
				}
            break;
			case "confirmar":
				$('#confirmar_cotizacion').modal('show');
            break;
			case "btn_finalizar":
				$('#confirmar_monitoreo').modal('show');
			break;
			case "btn_detalMante":
                $('#ver_detalle').modal('show');
				break;
			case "close_modalMante":
				$('#ver_detalle').modal('hide');
				break;
			case "Btn_cancelarMante":
				$('#atender_mante').hide();
				$('#solicitudes_mantenimiento').show();
			break;
			case "Btn_canceMoni":
				$('#form_Usuarios').hide();
				$('#usu_cont').hide();
				$('#principal').show();
				$('#solicitudes_monitoreo').show();
			break;
			default:
				if ($(this).text() === "Cancelar" || $(this).text() === "Regresar" ) {
					$('.secciones article').hide();
					$('.secciones article:first').show();
					$('#solicitud').val('0');
					$('#solicitud_pendiente').val('0');
				}else{
					$('.secciones article').hide();
					var activeBut = $(this).attr('href');
					$(activeBut).show();
				}
				return false;
		}
	});

	//Funcionalidad del listbox
	var select = document.getElementById('solicitud');
	select.addEventListener('change',
	function(){
		switch($(this).val()) {
			case "1":
				$('#tbody_pendientes').empty();
				llenar_tabla_nuevo_cliente('/pendientes/nuevo_cliente');
				break;
			case "2":
				$('#tbody_pendientes').empty(); 
				llenar_tabla_nuevo_inmueble('/pendientes/nuevo_inmueble');
				break;
			case "3":
				$('#tbody_pendientes').empty(); 
				llenar_tabla_nuevo_servicio('/pendientes/nuevo_servicio');
				break;
			}
			
		return false;
	});

	//Funcionalidad de los campos de fecha
	$('.ui.calendar').calendar({
		type: 'date',
		monthFirst: false,
		formatter: {
			date: function (date, settings) {
				if (!date) return '';
				var day = date.getDate();
				var month = date.getMonth() + 1;
				var year = date.getFullYear();
				return day + '/' + month + '/' + year;
			}
		}
	});

	//Funcionalidad de los campos de fecha
	$('.ui.calendar.time').calendar({
		ampm: false,
		type: 'time'
	});

	$('#tabla_pendientes tbody').on('click', 'tr', function() {
		//get row contents into an array
		$('tr.active').removeClass('active');
		$(this).addClass('active');
		seleccion = $(this).attr('id');
		console.log(seleccion);
		//
		// var tableData = $(this).children("td").map(function() {
		// 	return tableData;
		// }).get();
	});

	async function proceder_elemento_seleccionado(route, body) {
		const response = await fetch(route, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		const result = await response.json()
		console.log(result);
		return result.error
	}

	function llenar_datos_modal_nuevo(nombre, domicilio, telefono, fecha, hora, estatus, empleado, tipo_solicitud, tipo_servicio) {
		return `<tr id="${seleccion}">
					<td>Número de folio</td>
					<td>${seleccion}</td>
				<tr>
				<tr>
					<td>Nombre Completo</td>
					<td id="nombre">${nombre}</td>
				</tr>
				<tr>
					<td>Domicilio</td>
					<td id="domicilio">${domicilio}</td>
				</tr>
				<tr>
					<td>Teléfono</td>
					<td id="telefono">${telefono}</td>
				</tr>
				<tr>
					<td>Fecha de visita</td>
					<td id="fecha">${fecha}</td>
				</tr>
				<tr>
					<td>Hora de visita</td>
					<td id="hora">${hora}</td>
				</tr>
				<tr>
					<td>Estado</td>
					<td id=estatus>${estatus}</td>
				</tr>
				<tr>
					<td>Empleado</td>
					<td id=empleado>${empleado}</td>
				</tr>
				<tr>
					<td>Tipo de solicitud</td>
					<td id=tipo_solicitud>${tipo_solicitud}</td>
				</tr>
				<tr>
					<td>Tipo de servicio</td>
					<td id=tipo_servicio>${tipo_servicio}</td>
		</tr>`
	}

	function llenar_datos_modal_cliente(id_cliente, nombre, domicilio, telefono, fecha, hora, estatus, empleado, tipo_solicitud, tipo_servicio) {
		return `<tr id="${seleccion}">
					<td>Número de folio</td>
					<td>${seleccion}</td>
				<tr>
				<tr>
					<td>Número de cliente</td>
					<td>${id_cliente}</td>
				</tr>
				<tr>
					<td>Nombre Completo</td>
					<td>${nombre}</td>
				</tr>
				<tr>
					<td>Domicilio</td>
					<td>${domicilio}</td>
				</tr>
				<tr>
					<td>Teléfono</td>
					<td>${telefono}</td>
				</tr>
				<tr>
					<td>Fecha de visita</td>
					<td>${fecha}</td>
				</tr>
				<tr>
					<td>Hora de visita</td>
					<td>${hora}</td>
				</tr>
				<tr>
					<td>Estado</td>
					<td>${estatus}</td>
				</tr>
				<tr>
					<td>Empleado</td>
					<td>${empleado}</td>
				</tr>
				<tr>
					<td>Tipo de solicitud</td>
					<td>${tipo_solicitud}</td>
				</tr>
				<tr>
					<td>Tipo de servicio</td>
					<td>${tipo_servicio}</td>
		</tr>`
	}

	async function detalles_elemento_seleccionado(route, body) {
		const response = await fetch(route, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		const result = await response.json()
		console.log(result);
		var tbody = $('#tbody_modal')
		$.each(result.data, (i,row) => {
			if (row.tipo_solicitud.localeCompare("Nuevo cliente") == 0) {
				$(llenar_datos_modal_nuevo(row.nombre_completo, row.domicilio, row.telefono, row.fecha,
					row.hora_visita, row.estatus, row.empleado, row.tipo_solicitud, row.tipo_servicio)).appendTo(tbody);
			} else if (row.tipo_solicitud.localeCompare("Nuevo inmueble") == 0){
				$(llenar_datos_modal_cliente(row.id_cliente, row.nombre, row.domicilio, row.telefono, row.fecha,
					row.hora_visita, row.estatus, row.empleado, row.tipo_solicitud, row.tipo_servicio)).appendTo(tbody);
			} else {
				$(llenar_datos_modal_cliente(row.id_cliente, row.nombre, row.domicilio, row.telefono, row.fecha,
					row.hora_visita, row.estatus, row.empleado, row.tipo_solicitud, row.tipo_servicio)).appendTo(tbody);
			}
		})
		return seleccion_datos;
	}
	

});