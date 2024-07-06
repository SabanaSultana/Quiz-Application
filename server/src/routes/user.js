const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/user");
const isAuthenticated=require("../middlewares/isAuth")

// Get, user fetch
router.get("/:id", isAuthenticated,getUser);

// Put, user update
router.put("/",isAuthenticated, updateUser);

module.exports = router;
