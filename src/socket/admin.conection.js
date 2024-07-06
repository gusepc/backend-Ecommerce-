import usersService from "../services/usersService.js";

const socketA = async (socketServer) => {
  socketServer.on("connection", async (socket) => {
    console.log("admin conectado a los usuarios");
    try {
      let users = await usersService.find();

      socketServer.emit("envioUsuarios", users);
    } catch (error) {}

    socket.on("actualizacion", async () => {
      try {
        // console.log(mensaje, "se cambio el rol");
        let users = await usersService.find();
        socketServer.emit("envioUsuarios", users);
      } catch (error) {
        console.log(error, error);
      }
    });
    socket.on("eliminacion", async () => {
      try {
        let users = await usersService.find();
        socketServer.emit("envioUsuarios", users);
      } catch (error) {
        console.log(error, error);
      }
    });
  });
};
export default socketA;
