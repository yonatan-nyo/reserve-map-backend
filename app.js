require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");
const ErrorHandler = require("./middlewares/ErrorHandler");
const port = process.env.PORT || 9000;
const fileUpload = require("express-fileupload");
const compression = require("compression");

const { initialize } = require("./path/firebase/admin");
initialize();

app.use(compression());
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
