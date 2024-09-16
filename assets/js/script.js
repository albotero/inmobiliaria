import { propiedades_alquiler, propiedades_venta } from "./properties.js"

const updateDOM = (htmlTag, p) => {
  const div = document.querySelector(htmlTag)
  const smoke = p.smoke
    ? `<p class="text-success"><i class="fas fa-smoking"></i> Permitido fumar</p>`
    : `<p class="text-danger"><i class="fas fa-smoking-ban"></i> No se permite fumar</p>`
  const pets = p.pets
    ? '<p class="text-success"><i class="fas fa-paw"></i> Mascotas permitidas</p>'
    : '<p class="text-danger"><i class="fas fa-ban"></i> No se permiten mascotas</p>'
  div.innerHTML += `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img
          src="${p.src}"
          class="card-img-top"
          alt="Imagen del departamento"
        />
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">${p.descripcion}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${p.ubicacion}</p>
          <p>
            <i class="fas fa-bed"></i> ${p.habitaciones} Habitaciones |
            <i class="fas fa-bath"></i> ${p.banos} Baños</p>
          <p><i class="fas fa-dollar-sign"></i> ${p.costo.toLocaleString()}</p>
          ${smoke}
          ${pets}
        </div>
      </div>
    </div>`
}

const listProperties = ({ propType, n = Number.MAX_VALUE, htmlTag, sortBy }) => {
  // Get required properties array
  const properties = propType === "venta" ? propiedades_venta : propiedades_alquiler
  // Sort properties
  properties
    .sort((a, b) => {
      switch (sortBy) {
        case "dateAdded":
          // More recent first
          return Date.parse(b.dateAdded) - Date.parse(a.dateAdded)
        case "costo":
          // Lowest price first
          return a.costo - b.costo
        default:
          // Randomly sort
          return Math.random() - 0.5
      }
    })
    // Get first n properties
    .splice(n)
  // Update DOM object
  properties.forEach((el) => updateDOM(htmlTag, el))
}

// List properties from data object declared on .html file
data.forEach(listProperties)
