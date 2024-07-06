const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  updateUser,
  loginUser,
} = require("../controllers/user");

// Post, user registration
router.post("/", registerUser);

//post,  user login
router.post("/login", loginUser);

// Get, user fetch
router.get("/:id", getUser);

// Put, user update
router.put("/", updateUser);

module.exports = router;
