import EErrors from "../../services/errors/enums.js";

export default (error, req, res, next) => {
  req.logger.info(`${error.name} ${"\n"} ${error.cause} ${"\n"} ${error.message}`);

  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.status(400).json({ status: "error", error: error.name, message: error.message });
      break;
    case EErrors.INVALID_ID_ERROR:
      res.status(400).json({ status: "error", error: error.name, message: error.message });
      break;
    case EErrors.INVALID_AUTENTICATION_ERROR:
      return res.redirect("/api/sessions/login");
    default:
      res.status(500).json({ status: "error", error: "Error no contemplado" });
      break;
  }
};
