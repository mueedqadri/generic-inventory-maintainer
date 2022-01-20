const admin = require("firebase-admin");
const key = require("./constants")

let db;
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(key),
  });
  db = admin.firestore();
}

module.exports = db;