const socket = io();

socket.emit("message", "admin conectado");
socket.on("envioUsuarios", (users) => {
  try {
    const listContainer = document.getElementById("user-table-body");
    listContainer.innerHTML = ``;
    users.forEach((user) => {
      listContainer.innerHTML += `
        <tr>

          <td>${user.last_name}</td>
          <td>${user.last_name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
         <td>
            <button class="change-role-btn" data-email="${user._id}">Cambiar</button>
          </td>
          <td>
            <button class="delete-user-btn" data-email="${user._id}">Eliminar</button>
          </td>
        </tr>`;
    });
  } catch (error) {
    console.log(error);
  }

  document.querySelectorAll(".change-role-btn").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      let user = button.getAttribute("data-email");
      fetch(`/api/user/premium/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      })
        .then((data) => {
          console.log(`Rol del usuario con id: ${user} cambiado`);
          socket.emit("actualizacion");
        })
        .catch((error) => console.error("Error:", error));
    });
  });

  document.querySelectorAll(".delete-user-btn").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      let user = button.getAttribute("data-email");
      fetch(`/api/user/${user}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      })
        .then((data) => {
          console.log(`Usuario con el id: ${user} eliminado`);
          socket.emit("eliminacion");
        })
        .catch((error) => console.error("Error:", error));
    });
  });
});
