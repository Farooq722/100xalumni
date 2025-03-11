const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getAllUser } = require("../contollers/userController"); 
const { userDetails, getUserDetail } = require("../contollers/userDetailController");
const { authMiddleware } = require("../utils/authMiddleware");
const { singleUpload } = require("../utils/multer");
const { alumniAuthMiddleware } = require("../utils/alumniAuthMiddleware");

router.post("/register", registerUser)
// router.post("/verify-email", ver)
router.post("/login", loginUser)
router.post("/update", authMiddleware, alumniAuthMiddleware, singleUpload, userDetails);
router.get("/logout", logout);
router.get("/all-user", getAllUser);
router.get("/alumni-user", getUserDetail);

module.exports = router;