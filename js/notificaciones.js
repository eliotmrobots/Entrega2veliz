



// js/notificaciones.js

export function ingreseNombreApellido() {
    return Swal.fire({
        icon: "info",
        title: "El nombre y apellido solo deben contener letras y espacios.",
    });
}

  export function ingreseMarcaModelo() {
    return Swal.fire({
        icon: "info",
        title: "  marca y modelo solo deben contener letras y espacios.",
        timer: 2000,
        showConfirmButton: true,
    });
}

export function ingreseNumero() {
    return Swal.fire({
        icon: "info",
        title: "El teléfono debe contener entre 7 y 15 dígitos numéricos.",
        timer: 2000,
        showConfirmButton: false,
    });
}

export function emailInvalido() {
    return Swal.fire({
        icon: "info",
        title: "Por favor, ingrese un correo electrónico válido.",
        timer: 2000,
        showConfirmButton: false,
    });
}

export function anioInvalido() {
    return Swal.fire({
        icon: "info",
        title: "Por favor, ingrese un año válido.",
        timer: 2000,
        showConfirmButton: false,
    });
}

// js/notificaciones.js

// Función para confirmar creación de turno
export async function confirmarCrearTurno(datosPersonales) {
    const { nombre, apellido, fecha, hora, servicio, marcaAuto, modelo, anio } = datosPersonales;
    
    const result = await Swal.fire({
        title: '¿Confirmar turno?',
        html: `
            <div style="text-align: left; margin: 0 auto; max-width: 300px;">
                <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p><strong>Hora:</strong> ${hora}</p>
                <p><strong>Servicio:</strong> ${servicio}</p>
                <p><strong>Vehículo:</strong> ${marcaAuto} ${modelo} (${anio})</p>
            </div>
            <br>
            <p>¿Confirmas crear este turno?</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Cancelar',
        cancelButtonText: 'Confirmar',
        confirmButtonColor: '#d68030ff',
        cancelButtonColor: 'rgba(51, 91, 221, 1)',
        
    });
    
    return result.isConfirmed;
}

// Función para mostrar éxito al crear turno
export function mostrarTurnoCreado(nombre, apellido) {
    return Swal.fire({
        title: '¡Turno creado exitosamente!',
        text: `El turno para ${nombre} ${apellido} ha sido registrado`,
        icon: 'success',
        confirmButtonText: 'Entendido',
        timer: 3000,
        showConfirmButton: true
    });
}

// Función para mostrar cancelación
export function mostrarTurnoCancelado() {
    return Swal.fire({
        title: 'Turno cancelado',
        text: 'No se ha creado ningún turno',
        icon: 'info',
        confirmButtonText: 'Entendido',
        timer: 2000
    });
}

// Función para confirmar eliminación de turno
export async function confirmarEliminarTurno(nombre, apellido) {
    const result = await Swal.fire({
        title: '¿Eliminar turno?',
        text: `¿Estás seguro de eliminar el turno de ${nombre} ${apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, mantener',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      
    });
    
    return result.isConfirmed;
}

// Función para mostrar turno eliminado
export function mostrarTurnoEliminado() {
    return Swal.fire({
        title: 'Turno eliminado',
        text: 'El turno ha sido eliminado correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
    });
}

// Función de bienvenida (la que ya tienes)
export function mostrarBienvenida() {
    return Swal.fire({
        title: "¡Bienvenido!",
        text: "Sistema de turnos - Taller de chapa y pintura",
        icon: "info",
        confirmButtonText: "Comenzar"
    });
}

export function toastExito() {
return Swal.fire({
         toast: true,
        position: "top-end",
         icon: "success",
        title: "Turno creado con éxito",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
}