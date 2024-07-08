const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./src/routes/user");
const authRoute = require("./src/routes/auth");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hii");
});
// CORS
app.use(cors());
//user Route
app.use("/user", userRoute);
//auth route
app.use("/auth", authRoute);
//PORT
const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Database");
  })
  .catch((err) => {
    console.error("There was an error while connecting to the database", err);
  });

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
