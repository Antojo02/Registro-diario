document.addEventListener("DOMContentLoaded", function() {
  // Función para guardar un nuevo registro
  const form = document.getElementById("registro-form");
  form && form.addEventListener("submit", function(e) {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const actividad = document.getElementById("actividad").value;

    if (fecha && actividad) {
      let registros = JSON.parse(localStorage.getItem("registros")) || [];
      registros.push({ fecha, actividad });
      localStorage.setItem("registros", JSON.stringify(registros));

      // Redirigir al usuario a la página de registros
      window.location.href = "registro.html";
    }
  });

  // Función para mostrar los registros
  const registrosDiv = document.getElementById("registros");
  if (registrosDiv) {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    registrosDiv.innerHTML = registros.map((registro, index) => {
      return `
        <div>
          <strong>${registro.fecha}</strong>
          <p>${registro.actividad}</p>
          <button class="eliminar" data-index="${index}">Eliminar</button>
        </div>
      `;
    }).join("");

    // Añadir el evento de eliminar
    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach(boton => {
      boton.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        eliminarRegistro(index);
      });
    });
  }
});

// Función para eliminar un registro
function eliminarRegistro(index) {
  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.splice(index, 1);  // Eliminar el registro en la posición 'index'
  localStorage.setItem("registros", JSON.stringify(registros));

  // Recargar la página para mostrar los cambios
  window.location.reload();
}
