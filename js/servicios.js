
// Función para cargar servicios desde JSON
 export async function cargarServicios() {
    try {
        const response = await fetch('./data/servicios.json');
        const datos = await response.json();
        return datos.servicios;
    } catch (error) {
        // Error al cargar servicios, retornar array vacío
        return [];
    }
}

// Función para actualizar el select con precios
export async function actualizarSelectServicios() {
    const servicios = await cargarServicios();
    const select = document.getElementById('servicio');
    
    // Limpiar opciones actuales
    select.innerHTML = '';
    
    // Agregar servicios con precios
    servicios.forEach(servicio => {
        const option = document.createElement('option');
        option.value = servicio.nombre.toLowerCase();
        
        if (servicio.precio === 0) {
            option.textContent = `${servicio.nombre} - A cotizar`;
        } else {
            option.textContent = `${servicio.nombre} - $${servicio.precio.toLocaleString()}`;
        }
        
        select.appendChild(option);
    });
}