import usersServices from "../services/usersService.js";

async function upadteUser(req, res) {
  try {
    const uid = req.params.uid;
    let usuarioAct = await usersServices.findById(uid);

    if (usuarioAct) {
      let update;
      if (usuarioAct.role == "user") {
        update = { role: "premium" };
      } else if (usuarioAct.role == "premium") {
        update = { role: "user" };
      }
      let actualizacion = await usersServices.findByIdAndUpdate(uid, update);

      res.send(actualizacion);
    } else {
      res.send("usuario no encontrado");
    }
  } catch (error) {
    console.log("error usercontroller");
  }
}

export default { upadteUser };
