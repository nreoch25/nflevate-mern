export default (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must be logged in" });
  }
  if (req.user.type !== "admin") {
    return res.status(401).send({ error: "You must be an admin user type" });
  }
  next();
};
