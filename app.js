const express = require("express");
const bodyParser = require("body-parser");
const models = require("./models");

const app = express();

app.use(bodyParser.json());

//Create new user

app.post("/users", async (req, res) => {
  const newUser = await models.User.create(req.body);
  res.json(newUser);
});

app.post("/users/:userId/bankaccounts", async (req, res) => {
  findByPk(req.params.userId);
  if (!user) {
    return res.status(404).json({ errpr: "User not found" });
  }
  const newBankAccount = await user.createBankAccount(req.body);
  res.json(newBankAccount);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
