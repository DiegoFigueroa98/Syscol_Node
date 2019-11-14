var seleccion = "";
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

function filas_tabla_nuevo_inmueble(nombre_completo, fecha, hora, estatus) {
	return `<tr>
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
		$(filas_tabla_nuevo_inmueble(row.nombre, row.fecha, row.hora_visita, row.estatus)).appendTo(tbody)
	}) 
	return result.error
}

function filas_tabla_nuevo_servicio(nombre_completo, fecha, hora, estatus) {
	return `<tr>
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
		$(filas_tabla_nuevo_inmueble(row.nombre, row.fecha, row.hora_visita, row.estatus)).appendTo(tbody)
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
			case "confirmar":
				$('#confirmar_cotizacion').modal('show');
            break;
            case "si":
                $('#principal').hide();
                $('#ciz').show();
                $('#confirmar_cotizacion').modal('hide');
                $('#form_cliente').show();
            break;
            case "no":
                $('#confirmar_cotizacion').modal('hide');
                $('.secciones article').hide();
                $('#Menu_pendientes').show();
			break;
            case "btn_proceder":
                $('#principal').hide();
                $('#ciz').show();
                $('#form_cliente').show();
			break;
			case "btn_hacerMoni":
                $('#principal').hide();
                $('#usu_cont').show();
				$('#form_Usuarios').show();
			break;
			case "btn_finalizar":
				$('#confirmar_monitoreo').modal('show');
			break;
			case "no_monitoreo":
				$('#confirmar_monitoreo').modal('hide');
				$('#ciz').hide();
				$('#principal').show();     
				$('.secciones article:first').show();     
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
			case "Btn_cancelAsigMante":
				$('#form_Asignar').hide();
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
			break;
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
		//
		// var tableData = $(this).children("td").map(function() {
		// 	return tableData;
		// }).get();
	});

	async function datos_elemento_seleccionado(route) {
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




});