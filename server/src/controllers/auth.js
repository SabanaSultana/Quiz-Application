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
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, "thisismysecretsecretkey", {
        expiresIn: "1h",
      });
      res
        .status(200)
        .send({ sucess: true, message: "Login successful", data: token });
    } else {
      res.status(401).send({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).send({
      sucess: false,
      message: "Something went wrong while logged in",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
