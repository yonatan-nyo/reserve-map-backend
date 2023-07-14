const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const Authentication = require("../middlewares/Authentication");

router.delete("/", Authentication, UserController.deleteUser);
router.post("/github-signin", UserController.githubSignIn);
router.post("/location", UserController.getLocation);
router.get("/profile", Authentication, UserController.getProfile);
router.put("/profile/edit", Authentication, UserController.editProfile);
router.get("/history", Authentication, UserController.getHistories);

module.exports = router;
