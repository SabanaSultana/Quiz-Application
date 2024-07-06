const regusterUser = (req, res) => {
  try {
    console.log("Registration done");
    res.send("Registration done");
    console.log(req.body); // save req.body to model and then model will save this data to DataBase
  } catch (error) {
    console.log("error while registration ", error);
  }
};
module.exports = regusterUser;
