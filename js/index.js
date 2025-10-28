

// Importar funciones de notificaciones
import { 
    confirmarCrearTurno, 
    mostrarTurnoCreado, 
    mostrarTurnoCancelado,
    confirmarEliminarTurno,
    mostrarTurnoEliminado,
    mostrarBienvenida,
	ingreseNombreApellido,
	ingreseMarcaModelo,
	 ingreseNumero,
	 emailInvalido,
	 anioInvalido,
} from './notificaciones.js';

// importar funciones de servicios.js
import {
	 actualizarSelectServicios,
	 cargarServicios ,
	} from './servicios.js';



// Mostrar mensaje de bienvenida al cargar la página
// Mostrar bienvenida al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarBienvenida();
    actualizarSelectServicios();
});

const formulario = document.getElementById('turnoForm');
const contenedorTurnos = document.getElementById('turnosContainer');
// CARGA DE TURNOS DESDE LOCALSTORAGE
let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
let turnoId = turnos.length > 0 ? turnos[turnos.length - 1].id + 1 : 1;

// le asignamos estilos al html desde js



const contenedorH1 = document.querySelector('h1');

contenedorH1.className = 'estiloH1';

const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.className = 'estiloForm';
});
const labels = document.querySelectorAll('label');

labels.forEach(label => {
	label.className = 'estiloLabel';
});
const inputs = document.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
	input.className = 'estiloInput';
});
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
	button.className = 'estiloButton';
});


cargarServicios();


//  se captura el evento submit del formulario

async function crearTurno(event) {
  event.preventDefault();

	// se capturan los valores de los campos del formulario


	const datosFormulario = {
		nombre: document.getElementById('nombre').value,
		apellido: document.getElementById('apellido').value,
		telefono: document.getElementById('telefono').value,
		email: document.getElementById('email').value,
		marcaAuto: document.getElementById('marcaAuto').value,
		modelo: document.getElementById('modelo').value,
		anio: document.getElementById('anio').value,
		fecha: document.getElementById('fecha').value,
		hora: document.getElementById('hora').value,
		servicio: document.getElementById('servicio').value,
		observaciones: document.getElementById('observaciones').value,
	};
      if (!validarDatos(datosFormulario)) {
		return;
	}

	const confirmar = await confirmarCrearTurno(datosFormulario);

	if (confirmar) {

	// objeto turno
    const turno = {
		id: turnoId++,
		...datosFormulario
	};
	 
	turnos.push(turno);

	localStorage.setItem('turnos', JSON.stringify(turnos));

	renderTurnos(turno);
	formulario.reset();

	 await mostrarTurnoCreado(datosFormulario.nombre, datosFormulario.apellido);
   } else {
	 await mostrarTurnoCancelado();
}
}

// / Función de validación (extrae tus validaciones aquí)
function validarDatos(datos) {
    const { nombre, apellido, telefono, email, marcaAuto, modelo, anio, fecha, hora, servicio } = datos;
    
	function numeroLetras (campo) {
		const regex = /^[A-Za-z\s]+$/;
		return regex.test(campo);
	}

	if (!numeroLetras(nombre) || !numeroLetras(apellido)) {
		ingreseNombreApellido();
		return;
	}
	if (telefono.length < 7 || telefono.length > 15 || !/^\d+$/.test(telefono)) {
		ingreseNumero();
		return;

	}
	if (!/\S+@\S+\.\S+/.test(email)) {
		emailInvalido();
		return;
	}
	if (!isNaN(marcaAuto)) {
		ingreseMarcaModelo();
		return;
	}
	if (!isNaN(modelo)) {
		ingreseMarcaModelo();
		return;
	}
	if (anio < 1900 || anio > new Date().getFullYear()) {
		anioInvalido();
		return;
	}
	if (!fecha) {
		ingreseNumero();
		return;
	}
	if (!hora) {
		ingreseNumero();
		return;
	}
	if (!servicio) {
		Swal.fire({
			title: 'Servicio requerido',
			text: 'Por favor, seleccione un servicio.',
			icon: 'warning',
			confirmButtonText: 'Entendido'
		});
		return;
	}
	
	return true;
}

function renderTurnos (turno) {
const turnosDiv = document.createElement('div');

turnosDiv.dataset.id = turno.id;
turnosDiv.className = 'turno-card';

turnosDiv.innerHTML = `
<p><strong>El turno se ha creado correctamente </strong></p>
<p><strong>Nombre:</strong> ${turno.nombre} ${turno.apellido}</p>
<p><strong>Teléfono:</strong> ${turno.telefono}</p>
<p><strong>Email:</strong>  ${turno.email} </p>
<p><strong>Marca del Auto:</strong> ${turno.marcaAuto}</p>
<p><strong>Modelo del Auto:</strong> ${turno.modelo}</p>
<p><strong>Año del Auto:</strong> ${turno.anio}</p>
<p><strong>Fecha:</strong> ${turno.fecha}</p>
<p><strong>Hora:</strong> ${turno.hora}</p>
<p><strong>Servicio:</strong> ${turno.servicio}</p>
<p><strong>Observaciones:</strong> ${turno.observaciones}</p>

 <p><strong>un dia antes de la fecha del turno se le enviara un
  email recordatorio</strong></p>
 <p><strong>Muchas gracias por elegirnos</strong></p>
 <button>Limpiar Turnos</button>
`;



turnosDiv.querySelector('button').addEventListener('click', async () => {
	const confirmar = await confirmarEliminarTurno(turno.nombre, turno.apellido);
	if (confirmar) {
		deleteTurno(turno.id);
		await mostrarTurnoEliminado();
	}
});

contenedorTurnos.appendChild(turnosDiv);
}
// borrarTurno
function deleteTurno(id) {
	turnos = turnos.filter((turno) => turno.id !== id);
	localStorage.setItem('turnos', JSON.stringify(turnos));
	const turnoDiv = contenedorTurnos.querySelector(`[data-id="${id}"]`);
	if (turnoDiv) turnoDiv.remove();
}


// Event listener del formulario
formulario.addEventListener('submit', crearTurno);