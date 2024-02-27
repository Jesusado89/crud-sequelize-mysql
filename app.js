const express = require("express");
const bodyParser = require("body-parser");
const models = require("./models");

const app = express();

app.use(bodyParser.json());

// Create new user
app.post("/users", async (req, res) => {
  try {
    const newUser = await models.User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a bank account for a user
app.post("/users/:userId/bankaccounts", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newBankAccount = await user.createBankAccount(req.body); // Asumiendo que este método existe en tu modelo de User
    res.json(newBankAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user by ID
app.get("/users/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user
app.put("/users/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user
app.delete("/users/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Assuming BankAccount is a model related to User and has a method 'destroy' for deletion
// Update bank account
app.put("/users/:userId/bankaccounts/:bankAccountId", async (req, res) => {
  try {
    const bankAccount = await models.BankAccount.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.bankAccountId,
      },
    });
    if (!bankAccount) {
      return res.status(404).json({ error: "Bank account not found" });
    }
    const updatedBankAccount = await bankAccount.update(req.body);
    res.json(updatedBankAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete bank account
app.delete("/users/:userId/bankaccounts/:bankAccountId", async (req, res) => {
  try {
    const bankAccount = await models.BankAccount.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.bankAccountId,
      },
    });
    if (!bankAccount) {
      return res.status(404).json({ error: "Bank account not found" });
    }
    await bankAccount.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
