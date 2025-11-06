let db;

// Abrir base de datos IndexedDB y crear object store si es necesario
// --- ELIMINADO para que alumnos implementen ---
// const request = indexedDB.open("CRM_Database", 1);

// request.onerror = function(event) {
//     console.error("Error abriendo IndexedDB", event);
// };

// request.onsuccess = function(event) {
//     db = event.target.result;
//     fetchClients(); // Cargar clientes almacenados
// };

// request.onupgradeneeded = function(event) {
//     db = event.target.result;
//     if(!db.objectStoreNames.contains('clients')) {
//         const objectStore = db.createObjectStore('clients', { keyPath: 'id', autoIncrement: true });
//         objectStore.createIndex('name', 'name', { unique: false });
//         objectStore.createIndex('email', 'email', { unique: true });
//         objectStore.createIndex('phone', 'phone', { unique: false });
//     }
// };

// --- VALIDACIONES ---
// TODO: Implementad validaciones usando expresiones regulares y eventos 'onblur'
// Elimina el código de validación y manejo de clases visuales para que ellos lo desarrollen
const form = document.getElementById('client-form');
const addBtn = document.getElementById('add-btn');
const inputs = form.querySelectorAll('input');

const patterns = {
  name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,40}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  phone: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/  
};

// --- Validaciones y activación botón ---
// Dejar el botón siempre deshabilitado. Que alumnos lo activen cuando validen campos
// addBtn.disabled = true; 

function validar(input) {
  const pattern = patterns[input.name];
  if (pattern && pattern.test(input.value.trim())) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    return true;
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
    return false;
  }
}

inputs.forEach(input => {
    // Quitar manejo de eventos 'blur' para validación (alumnos deben hacerlo)
    // input.addEventListener('blur', e => { ... });
    input.addEventListener('blur', () => {
    validateField(input);
    checkFormValidity();
  });
});

function comprobarValidacion() {
  const allValid = Array.from(inputs).every(input => validateField(input));
  addBtn.disabled = !allValid;
}

// --- AGREGAR CLIENTE ---
// TODO: Implementar la función que capture los datos y los agregue a IndexedDB
form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim(); 
    const email = form.email.value.trim(); 
    const phone = form.phone.value.trim(); 
    
    if (!validateField(form.name) || !validateField(form.email) || !validateField(form.phone)) { alert('Por favor corrige los campos inválidos antes de continuar.'); return; } 
        const transaction = db.transaction(['clients'], 'readwrite'); 
        const store = transaction.objectStore('clients'); 
        const newClient = { name, email, phone }; 
        const requestAdd = store.add(newClient); 
        requestAdd.onsuccess = () => { form.reset(); inputs.forEach(i => i.classList.remove('valid')); addBtn.disabled = true; fetchClients(); }; 
        requestAdd.onerror = (e) => { 
            alert("Error al agregar cliente (¿Email duplicado?)"); 
            console.error(e);
        }; 
});

// --- LISTADO DINÁMICO ---
// TODO: Implementar función para mostrar clientes guardados en IndexedDB
function fetchClients() {
    // Código eliminado para que alumnos implementen mecanismo de lectura
}

// --- EDITAR CLIENTE ---
window.editClient = function(id) {
    // Código eliminado para implementación del alumno
};

// --- ELIMINAR CLIENTE ---
window.deleteClient = function(id) {
    // Código eliminado para implementación del alumno
};

