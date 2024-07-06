const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Creation
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //encrypt password
    const hashPassword = await bcrypt.hash(password, 12);

    const user = await new User({ name, email, password: hashPassword });
    const result = await user.save();
    // console.log("result: ", result)
    if (!result) {
      res.status(400).send({
        status: "error",
        message: "No result found",
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Registration Done",
        data: { userId: result._id },
      });
    }
  } catch (error) {
    console.log("Error while registration:", error);
    res.status(500).send({
      status: "error",
      message: "Something went wrong while registering",
      error: error.message,
    });
  }
};

// user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Wrong password" });
    }

    // Successful login
    res.status(200).send({ sucess:true, message: "Login successful" });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).send({sucess:false, message: "Something went wrong while logged in", error:error.message });
  }
};

//user Fetching
const getUser = async (req, res) => {
  try {
    // console.log("params",req.params)
    // console.log("query",req.query)
    const userId = req.params.userId;
    const user = await User.findById(userId, { name: 1, email: 1 });
    if (!user) {
      res.status(404).send({
        status: "error",
        message: "User not found",
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "User found",
        data: { user: user },
      });
    }
  } catch (error) {
    console.log("Error while fetching user:", error);
    res.status(500).send({
      status: "error",
      message: "Something went wrong while fetching user",
      error: error.message,
    });
  }
};

//user details updating
const updateUser = async (req, res) => {
  try {
    const userId = req.body._id;
    const user = await User.findById(userId);
    user.name = req.body.name;
    const result = await user.save();
    if (!result) {
      res.status(404).send({
        status: "error",
        message: "User not found",
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "User updated successfully",
        data: result,
      });
    }
  } catch (error) {
    console.log("Error while updating user:", error);
    res.status(500).send({
      status: "error",
      message: "Something went wrong while updating user",
      error: error.message,
    });
  }
};

module.exports = { registerUser, getUser, updateUser, loginUser };
