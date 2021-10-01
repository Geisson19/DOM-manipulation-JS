"use strict";
//Saco los elementos que no van a cambiar en constantes globales
const contenedorGif = document.querySelector("#cardcon");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const correo = document.querySelector("#email");
const btnAgregar = document.querySelector("#btnAgregar");
const modal = document.querySelector(".modal");

//Json de los datos iniciales de la contenedorGif (los cambié para probar los sorts)
let ejemploDatos = [
  {
    last_name: "a",
    first_name: "z",
    email: "1az@dell.com",
    photo: "http://dummyimage.com/155x119.jpg/ff4444/ffffff",
  },
  {
    last_name: "c",
    first_name: "a",
    email: "2cz@ibm.com",
    photo: "http://dummyimage.com/161x166.bmp/cc0000/ffffff",
  },
  {
    last_name: "z",
    first_name: "c",
    email: "3zc@macromedia.com",
    photo: "http://dummyimage.com/195x201.png/ff4444/ffffff",
  },
];

const remplazarcontenedorGif = (personasOrdenadas) => {
  contenedorGif.innerHTML = "";
  renderPersonas(personasOrdenadas);
};

const cambioDeColorListener = (cardbody) => {
  // Cuando el mouse está arriba de la fila
  cardbody.addEventListener("mouseover", () => {
    cardbody.style.backgroundColor = "aquamarine";
  });
  // Cuando se sale da la fila
  cardbody.addEventListener("mouseout", () => {
    cardbody.style.backgroundColor = "white";
  });
};

const borrarFilaButton = (tr, btnEliminar, persona) => {
  btnEliminar.addEventListener("click", () => {
    contenedorGif.removeChild(tr);
    ejemploDatos.splice(ejemploDatos.indexOf(persona), 1);
  });
};

const actualizarFilaButton = (tr, id, btnActualizar, persona) => {
  btnActualizar.addEventListener("click", () => {
    modal.style.display = "flex";

    const btnCerrarModal = document.querySelector(".close");
    btnCerrarModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    const btnCerrarModal2 = document.querySelector("#close-modal");
    btnCerrarModal2.addEventListener("click", () => {
      modal.style.display = "none";
    });

    const btnGuardar = document.querySelector("#guardarDatos");

    btnGuardar.addEventListener("click", () => {
      const nombre = document.querySelector("#nombreModal").value;
      const apellido = document.querySelector("#apellidoModal").value;
      const correo = document.querySelector("#correoModal").value;

      const valido = nombre.length > 0 && apellido.length > 0 && correo.includes("@");
      if (valido) {
        const nuevaPersona = {
          last_name: apellido,
          first_name: nombre,
          email: correo,
          photo: persona.photo,
        };
        ejemploDatos[ejemploDatos.indexOf(persona)] = nuevaPersona;
        const newtr = document.createElement("tr");
        newtr.innerHTML = renderPersona(id, nuevaPersona);
        contenedorGif.replaceChild(newtr, tr);
        modal.style.display = "none";
      }
    });
  });
};

//Renderiza todas las personas(array) usando el render da cada persona
const renderPersonas = (personas) => {
  let id = 0;
  personas.forEach((persona) => {
    const card = document.createElement("div");
    card.innerHTML = renderPersona(++id, persona);
    contenedorGif.appendChild(card);
    const backColor = document.querySelector(`#colorcard${id}`);
    cambioDeColorListener(backColor);
    const btnEliminar = document.querySelector(`#btnBorrar${id}`);
    const btnActualizar = document.querySelector(`#btnActualizar${id}`);
    borrarFilaButton(card, btnEliminar, persona);
    actualizarFilaButton(card, id, btnActualizar, persona);
  });
};

const renderPersona = (id, persona) => {
  return `
  <div class="card" style="width: 18rem;">
    <img src="${persona.photo}" class="card-img-top card-img" alt="${persona.first_name}">
    <div id="colorcard${id}" class="card-body">
    
        <h5 class="card-title">${persona.first_name}</h5>
        <p class="card-text">Apellido: ${persona.last_name} </p>
        <p class="card-text">Correo: ${persona.email} </p>

        <button id="btnBorrar${id}" class="btn btn-primary">❌</button>
        <button id="btnActualizar${id}" class="btn btn-primary">🆕</button>
    </div>
  </div>`;
};

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

nombre.addEventListener("click", () => {
  const ordenado = ejemploDatos.sort(ordenPorPropiedad("first_name", 1));
  remplazarcontenedorGif(ordenado);
});

apellido.addEventListener("click", () => {
  const ordenado = ejemploDatos.sort(ordenPorPropiedad("last_name", 1));
  remplazarcontenedorGif(ordenado);
});

correo.addEventListener("click", () => {
  const ordenado = ejemploDatos.sort(ordenPorPropiedad("email", 1));
  remplazarcontenedorGif(ordenado);
});
/* --------------------------------------------------------------------- */

// logica del botón de agregar
btnAgregar.addEventListener("click", () => {
  const nombre = document.querySelector("#nombreIn").value;
  const apellido = document.querySelector("#apellidoIn").value;
  const correo = document.querySelector("#correoIn").value;

  const valido = nombre.length > 0 && apellido.length > 0 && correo.includes("@");
  if (valido) {
    const nuevaPersona = {
      last_name: apellido,
      first_name: nombre,
      email: correo,
      photo: "http://dummyimage.com/155x119.jpg/ff4444/ffffff",
    };
    ejemploDatos.push(nuevaPersona);
    remplazarcontenedorGif(ejemploDatos);
  }
});

//Función inicial cuando se carga la pagina

const init = () => {
  renderPersonas(ejemploDatos);
};

init();
