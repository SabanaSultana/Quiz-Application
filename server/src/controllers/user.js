const User = require("../models/user");

//user Fetching
const getUser = async (req, res) => {
  console.log("userId", req.userId);
  try {
    console.log("params Id", req.params.id);
    // console.log("query",req.query)

    const userId = req.params.id;
    if (req.userId != userId) {
      throw new Error(
        "You can not access this user bcz you are not authorized"
      );
    }
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
    const userId = req.params.id;
    if (req.userId != userId) {
      throw new Error(
        "You can not access this user bcz you are not authorized"
      );
    }
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

module.exports = { getUser, updateUser };
