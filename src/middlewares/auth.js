import EErrors from "../services/errors/enums.js";
import CustomError from "../services/errors/CustomErrors.js";

function auth(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    CustomError.createError({
      name: "Error de autenticacion",
      cause: "No es posible ingresar a este sitio sin iniciar sesion",
      message: "Inicia sesion para navegar en el sitio",
      code: EErrors.INVALID_AUTENTICATION_ERROR,
    });
  }
}
function isPremium(req, res, next) {
  auth(req, res, () => {
    if (req.session.user.role == "premium") {
      return next();
    } else {
      return res.redirect("/products");
    }
  });
}
function isUser(req, res, next) {
  auth(req, res, () => {
    if (req.session.user.role == "user") {
      return next();
    } else {
      return res.redirect("/products");
    }
  });
}
function isAdmin(req, res, next) {
  auth(req, res, () => {
    if (req.session.user.role == "admin") {
      return next();
    } else {
      return res.redirect("/products");
    }
  });
}
function isAdminOrPremium(req, res, next) {
  auth(req, res, () => {
    if (req.session.user.role == "premium" || req.session.user.role == "admin") {
      return next();
    } else {
      return res.redirect("/products");
    }
  });
}
function isUserOrPremium(req, res, next) {
  auth(req, res, () => {
    if (req.session.user.role == "premium" || req.session.user.role == "user") {
      return next();
    } else {
      return res.redirect("/products");
    }
  });
}
export default {
  auth,
  isAdmin,
  isUser,
  isPremium,
  isAdminOrPremium,
  isUserOrPremium,
};
