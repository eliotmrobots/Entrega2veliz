
const formulario = document.getElementById('turnoForm');
const contenedorTurnos = document.getElementById('turnosContainer');
// CARGA DE TURNOS DESDE LOCALSTORAGE
let turn = JSON.parse(localStorage.getItem('turnos')) || [];

let turnos = [];
let turnoId = 1;

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
//  se captura el evento submit del formulario

formulario.addEventListener('submit',(event) => {

	event.preventDefault();

	// se capturan los valores de los campos del formulario
	const nombre = document.getElementById('nombre').value;
	const apellido = document.getElementById('apellido').value;
	const telefono = document.getElementById('telefono').value;
	const email = document.getElementById('email').value;
	const marcaAuto = document.getElementById('marcaAuto').value;
	const modelo = document.getElementById('modelo').value;
	const anio = document.getElementById('anio').value;
	const fecha = document.getElementById('fecha').value;
	const hora = document.getElementById('hora').value;
	const servicio = document.getElementById('servicio').value;
	const observaciones = document.getElementById('observaciones').value;
	// objeto turno
    const turno = {
		id: turnoId++,
     nombre: nombre,
	 apellido: apellido,
	 telefono: telefono,
	 email: email,
	 marcaAuto: marcaAuto,
	 modelo: modelo,
	 anio: anio,
	 fecha: fecha,
	 hora: hora,
	 servicio: servicio,
	 observaciones: observaciones,
	};
	
// Agregar al array y localStorage
 turnos.push(turno);
 
 localStorage.setItem('turnos', JSON.stringify(turnos));
console.log('Turnos cargados desde localStorage:', turnos);

// Renderizar el turno y limpiar el formulario
 renderTurnos(turno);
formulario.reset();

});

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
<br> email recordatorio</strong></p>
<p><strong>Muchas gracias por elegirnos</strong></p>
<button>Limpiar Turnos</button>
`;

turnosDiv.querySelector('button').addEventListener('click', () => {
	deleteTurno(turno.id);
});

contenedorTurnos.appendChild(turnosDiv);
}
// borrarTurno
function deleteTurno(id) {
	turnos = turnos.filter((turno) => turno.id !== id);

	const turnoDiv = contenedorTurnos.querySelector(`[data-id="${id}"]`);
	if (turnoDiv) turnoDiv.remove();
}


