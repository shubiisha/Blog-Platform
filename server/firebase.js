const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccount.json")),
});

module.exports = admin;
