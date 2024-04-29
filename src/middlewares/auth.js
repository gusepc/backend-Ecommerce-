import EErrors from "../services/errors/enums.js";
import CustomError from "../services/errors/CustomErrors.js";

function auth(req, res, next) {
  if (req.session?.user) {
    return next();
  } else {
    try {
      CustomError.createError({
        name: "Error de autenticacion",
        cause: "No es posible ingresar a este sitio sin iniciar sesion",
        message: "Inicia sesion para navegar en el sitio",
        code: EErrors.INVALID_AUTENTICATION_ERROR,
      });
      return res.redirect("/api/sessions/login");
    } catch (error) {
      next(error);
    }
  }
}

export default auth;
