import config from "../config/config.js";
import SessionDTO from "../dao/DTOs/session.dto.js";
import usersService from "../services/usersService.js";

function getLogin(req, res) {
  if (!req.session.user) {
    res.render("login", {
      layout: "main",
      title: "login",
      style: "styles.css",
    });
  } else {
    res.redirect("/products");
  }
}
function getGithub(req, res) {
  try {
    if (req.user) {
      let session = new SessionDTO(req.user);

      req.session.user = session;

      if (req.user.email === config.adminName) {
        req.session.user.role = "admin";
      }

      res.redirect("/products");
    } else {
      res.status(400).send("Se perdio la conexión con Github");
    }
  } catch (error) {
    console.log(error);
    res.send("algo salio mal");
  }
}

async function passLogin(req, res) {
  try {
    if (req.user) {
      let session = new SessionDTO(req.user);
      req.session.user = session;

      if (req.user.email === config.adminName) {
        req.session.user.role = "admin";
      }
      if (req.user.email != config.adminName) {
        setLastConection(req.user.email);
      }

      res.redirect("/products");
    } else {
      res.status(400).send("lo sentimos, el usuario o la contraseña son incorrectos");
    }
  } catch (error) {
    console.log(error);
    res.send("algo salio mal");
  }
}

function getProfile(req, res) {
  let session = new SessionDTO(req.session.user);
  res.render("profile", {
    layout: "main",
    title: "profile",
    style: "styles.css",
    user: session,
  });
}
function getRegister(req, res) {
  if (!req.session?.user) {
    res.render("register", {
      layout: "main",
      title: "register",
      style: "styles.css",
    });
  } else {
    req.logger.warning(`usuario no autenticado`);
    res.redirect("/products");
  }
}
function postRegister(req, res) {
  res.redirect("/api/sessions/login");
}
function getLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("algo salio mal");
    } else {
      res.clearCookie("connect.sid");
      res.redirect("/api/sessions/login");
    }
  });
}

async function setLastConection(userEmail) {
  let user = await usersService.findOne({ email: userEmail });
  user.lastConnection = new Date();
  await user.save();
  console.log(user.lastConnection);
}

export default {
  getLogin,
  getGithub,
  passLogin,
  getProfile,
  getRegister,
  postRegister,
  getLogout,
};
