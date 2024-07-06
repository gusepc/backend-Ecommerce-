import usersServices from "../services/usersService.js";
import UserForAdminDTO from "../dao/DTOs/userForAdmin.dto.js";
import usersService from "../services/usersService.js";
import mailsController from "./mailsController.js";

async function getUsers(req, res) {
  try {
    let users = await usersServices.find();

    let secureUsers = [];
    users.forEach((user) => {
      let userDto = new UserForAdminDTO(user);
      let formatedUser = {
        first_name: userDto.first_name,
        last_name: userDto.last_name,
        email: userDto.email,
        role: userDto.role,
      };
      secureUsers.push(formatedUser);
    });

    res.send(secureUsers);
  } catch (error) {
    console.log("fallo");
  }
}
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

async function deleteOldUSers(req, res) {
  try {
    let users = await usersServices.find();
    // const time = 1 * 60 * 1000;
    const time = 2 * 24 * 60 * 60 * 1000;
    let limite = new Date(Date.now() - time);
    users.forEach((user) => {
      if (user.lastConnection < limite) {
        console.log(user._id);
        usersService.findByIdAndDelete(user._id);
        if (user.email.includes("@")) {
          console.log(user);
          mailsController.sendMailDeleted(user.email, req, res);
        }
      }
    });
    users = await usersServices.find();
    res.send(users);
  } catch (error) {}
}
async function admin(req, res) {
  let users = await usersServices.find();
  let secureUsers = [];
  users.forEach((user) => {
    let userDto = new UserForAdminDTO(user);
    let formatedUser = {
      first_name: userDto.first_name,
      last_name: userDto.last_name,
      email: userDto.email,
      role: userDto.role,
      userID: String(userDto.userId),
    };
    secureUsers.push(formatedUser);
  });

  res.render("admin", {
    layout: "main",
    title: "admin",
    style: "styles.css",
    users: secureUsers,
  });
}
async function deleteUser(req, res) {
  try {
    const uid = req.params.uid;
    console.log(uid);
    usersService.findByIdAndDelete(uid);
    res.send(`Usuario con el id: ${uid} eliminado`);
  } catch (error) {}
}
export default {
  upadteUser,
  getUsers,
  deleteOldUSers,
  admin,
  deleteUser,
};
