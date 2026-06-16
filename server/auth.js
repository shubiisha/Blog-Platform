const admin = require("./firebase");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  const user = await admin.auth().verifyIdToken(token);

  req.user = user;

  next();
};
