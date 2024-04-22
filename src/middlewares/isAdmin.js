function isAdmin(req, res, next) {
  console.log(req.session.user);
  if (req.session.user.role == "admin") {
    return next();
  } else {
    return res.redirect("/products");
  }
}

export default isAdmin;
