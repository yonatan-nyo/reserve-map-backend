const admin = require("firebase-admin");
const serviceAccount = require("../to/serviceAccountKey.json");

const initialize = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://nongkuy-5132b.appspot.com",
  });
};

module.exports = { admin, initialize };
