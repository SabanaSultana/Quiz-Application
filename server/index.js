const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const UserRoute = require("./src/routes/user");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hii");
});
//user Route
app.use("/user", UserRoute);
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
