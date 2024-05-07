function notFound(req, res, next) {
  req.logger.http(`La ruta: ${req.url} no existe`);
  res.status(404).send("La ruta solicitada no fue encontrada en este router.");
  next();
}
export default notFound;
