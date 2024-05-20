import userModel from "../dao/mongo/models/usser.model.js";
import mailingService from "../services/mailingService.js";
import jwt from "../config/jwt.js";
import { createHash, isValidatePassword } from "../utils.js";

async function sendMail(req, res, next) {
  const { email } = req.body;

  const user = userModel.findOne({ email: email });

  if (user) {
    const token = jwt.generateResetToken(email);
    const resetLink = `http://localhost:8080/api/sessions/reset-password/${token}`;

    const info = {
      from: "Yo",
      to: email,
      subject: "Restablecer password",
      html: `<p> <a href="${resetLink}">aqui</a>.</p>`,
    };

    mailingService.sendSimpleMail(req, info);

    res.send("se envio el link a tu correo");
  }
}
async function verify(req, res) {
  const { token } = req.params;
  const validateJWT = jwt.verifyResetToken(token);

  if (validateJWT) {
    if (validateJWT.exp > Math.floor(Date.now() / 1000)) {
      res.render("reset", {
        layout: "main",
        token: String(token),
        title: "restore",
      });
    }
  } else {
    res.status(400).send(`
    <script>
    alert("El token es invalido o  ha expirado.");
      window.location.href = "/api/sessions/restore";
  </script>
  `);
  }
}
async function postReset(req, res) {
  const { token, newPassword, confirmPassword } = req.body;
  let validateJWT = jwt.verifyResetToken(token);
  if (validateJWT) {
    if (newPassword === confirmPassword) {
      let user = await userModel.findOne({ email: validateJWT.email });

      if (user) {
        let isValidate = isValidatePassword(user, newPassword);

        if (isValidate) {
          res.send("no se puede elegir la misma conrasena");
        } else {
          const hashedPassword = createHash(newPassword);
          await userModel.findOneAndUpdate({ email: validateJWT.email }, { password: hashedPassword });
          res.send("se cambio tu contrasena");
        }
      }
    } else {
      console.log("el usuuario correspondiente a ese token no es valido");
    }
  } else {
    console.log("hay error");
  }
}

function getRestore(req, res) {
  res.render("restore"),
    {
      layout: "main",
      title: "restore",
    };
}

export default { sendMail, verify, getRestore, postReset };
