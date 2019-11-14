$(document).ready(function(){

	//Elementos de los dropdown
	function elementos_nombre_cliente(nombre_cliente) {
		return `<div class="item" data-value="${nombre_cliente}">${nombre_cliente}</div>`
	}
		
	async function llenar_nombre_cliente(route) {
		const response = await fetch(route)
		console.log(response);
		const result = await response.json()
		console.log(result);
		let dropdown1 = $('#dropdown_inmueble')
		let dropdown2 = $('#dropdown_servicio')
		$.each(result.data, (i,row) => {
			$(elementos_nombre_cliente(row.nombre)).appendTo(dropdown1)
			$(elementos_nombre_cliente(row.nombre)).appendTo(dropdown2)
		}) 
		return result.error
	}

		//Elementos de los dropdown
		function elementos_domicilio_cliente(domicilio) {
			return `<div class="item" data-value="${domicilio}">${domicilio}</div>`
		}
			
		async function llenar_domicilio_cliente(route) {
			const response = await fetch(route)
			console.log(response);
			const result = await response.json()
			console.log(result);
			let dropdown = $('#dropdown_domicilio')
			$.each(result.data, (i,row) => {
				$(elementos_domicilio_cliente(row.domicilio)).appendTo(dropdown)
			}) 
			return result.error
		}

	//Mostrar únicamente la primera sección de la navegación de pestañas
	$('ul.tabs li a:first').addClass('active');
	$('.secciones article').hide();
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
			case "registrar_nuevo":
			case "registrar_inmueble":
			case "registrar_servicio":
				$('#confirmar_solicitud').modal('show');
			break;
			case "aceptar_solicitud":
				$('#confirmar_solicitud').modal('hide');
				$('#solicitud').val('0');
				$('#Form_inmueble').hide();
                $('#Form_servicio').hide();
                $('#Form_cliente').hide();
			break;
			default:
				if ($(this).text() === "Cancelar" || $(this).text() === "Regresar" ) {
					$('.secciones article').hide();
					$('.secciones article:first').show();
					$('#solicitud').val('0');
				}else{
					$('.secciones article').hide();
					var activeBut = $(this).attr('href');
					$(activeBut).show();
				}
				return false;
			break;
		}
	});

	//Cambiar de sección dependiendo de la opción seleccionada de un listbox
	var select = document.getElementById('solicitud');
	select.addEventListener('change',
	function(){
		switch($(this).val()) {
			case "Nuevo_cliente":
                $('#Form_inmueble').hide();
                $('#Form_servicio').hide();
                $('#Form_cliente').show();
			break;
			case "Nuevo_inmueble":
				$('#dropdown_inmueble').empty();         
                $('#Form_servicio').hide();
                $('#Form_cliente').hide();
				$('#Form_inmueble').show();
				llenar_nombre_cliente('/solicitudes/nombre_clientes');
            break;
            case "Nuevo_servicio":
				$('#dropdown_cliente').empty();
				$('#dropdown_servicio').empty();
				$('#dropdown_domicilio').empty();
                $('#Form_cliente').hide();
                $('#Form_inmueble').hide();
				$('#Form_servicio').show();
				llenar_nombre_cliente('/solicitudes/nombre_clientes');
				llenar_domicilio_cliente('/solicitudes/domicilio_clientes');
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

	//Funcionalidad del dropdown
	$('.ui.dropdown').dropdown();

});