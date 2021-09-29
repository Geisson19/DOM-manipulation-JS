'use strict';

//Saco los elementos que no van a cambiar en constantes globales
const tabla = document.querySelector('.tablaDatos');
const nombre = document.querySelector('.nombre');
const apellido = document.querySelector('.apellido');
const correo = document.querySelector('.correo');
const btnAgregar = document.querySelector('#btnAgregar');

//Json de los datos iniciales de la tabla (los cambié para probar los sorts)
let ejemploDatos = [
  {
    last_name: 'a',
    first_name: 'z',
    email: '1az@dell.com',
    photo: 'http://dummyimage.com/155x119.jpg/ff4444/ffffff',
  },
  {
    last_name: 'c',
    first_name: 'a',
    email: '2cz@ibm.com',
    photo: 'http://dummyimage.com/161x166.bmp/cc0000/ffffff',
  },
  {
    last_name: 'z',
    first_name: 'c',
    email: '3zc@macromedia.com',
    photo: 'http://dummyimage.com/195x201.png/ff4444/ffffff',
  },
];

const remplazarTabla = (personasOrdenadas) => {
  tabla.innerHTML = '';
  renderPersonas(personasOrdenadas);
};

const cambioDeColorListener = (tr) => {
  // Cuando el mouse está arriba de la fila
  tr.addEventListener('mouseover', () => {
    tr.style.backgroundColor = 'aquamarine';
  });
  // Cuando se sale da la fila
  tr.addEventListener('mouseout', () => {
    tr.style.backgroundColor = 'white';
  });
};

const borrarFilaButton = (tr, btnEliminar) => {
  btnEliminar.addEventListener('click', () => {
    tabla.removeChild(tr);
  });
};

//Renderiza todas las personas(array) usando el render da cada persona
const renderPersonas = (personas) => {
  let id = 0;
  personas.forEach((persona) => {
    const tr = document.createElement('tr');
    tr.innerHTML = renderPersona(++id, persona);
    tabla.appendChild(tr);
    cambioDeColorListener(tr);
    const btnEliminar = document.querySelector(`#btnBorrar${id}`);
    borrarFilaButton(tr, btnEliminar);
  });
};

// Render de cada tr de los datos de una persona
const renderPersona = (id, persona) => {
  return `
    <tr class="datoPersona">
      <td>${persona.first_name}</td>
      <td>${persona.last_name}</td>
      <td>${persona.email}</td>
      <td><img src="${persona.photo}" alt="Foto"></td>
      <td><button id="btnBorrar${id}" class="btn btn-light" >❌</button></td>
      <td><button id="btnActualizar${id}"class="btn btn-light">Actualizar</button></td>
    </tr>`;
};

// Creo un "compareTo" por propiedad, que recibe también un orden por si se quiere poner ascendente o descendiente (1 o -1)
const ordenPorPropiedad = (prop, orden) => {
  return (a, b) => {
    if (a[prop] > b[prop]) {
      return orden * 1;
    } else if (a[prop] < b[prop]) {
      return orden * -1;
    }
    return 0;
  };
};

/* Le agrego eventos a todos los headers que ordenan */

nombre.addEventListener('click', () => {
  const ordenado = ejemploDatos.sort(ordenPorPropiedad('first_name', 1));
  remplazarTabla(ordenado);
});

apellido.addEventListener('click', () => {
  const ordenado = ejemploDatos.sort(ordenPorPropiedad('last_name', 1));
  remplazarTabla(ordenado);
});

correo.addEventListener('click', () => {
  const ordenado = ejemploDatos.sort(ordenPorPropiedad('email', 1));
  remplazarTabla(ordenado);
});
/* --------------------------------------------------------------------- */

// logica del botón de agregar
btnAgregar.addEventListener('click', () => {
  // Obtengo los datos del form
  const nombre = document.querySelector('#nombreIn').value;
  const apellido = document.querySelector('#apellidoIn').value;
  const correo = document.querySelector('#correoIn').value;
  // Validación simple para agregar
  const valido = nombre.length > 0 && apellido.length > 0 && correo.includes('@');
  if (valido) {
    const nuevaPersona = {
      last_name: apellido,
      first_name: nombre,
      email: correo,
      photo: 'http://dummyimage.com/155x119.jpg/ff4444/ffffff',
    };
    ejemploDatos.push(nuevaPersona);
    remplazarTabla(ejemploDatos);
  } else {
    console.log('Datos no válidos');
  }
});

//Función inicial cuando se carga la pagina
renderPersonas(ejemploDatos);
