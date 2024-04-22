function isUser(req, res, next) {
  console.log(req.session.user);
  if (req.session.user.role == "user") {
    return next();
  } else {
    return res.redirect("/products");
  }
}

export default isUser;
