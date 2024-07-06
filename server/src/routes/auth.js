const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth");

// Post, auth/user registration
router.post("/register", registerUser);

//post,  auth/user login
router.post("/login", loginUser);

module.exports = router;
