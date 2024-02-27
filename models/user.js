"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.BankAccount, {
        foreignKey: "idBankAccount",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      lastname: DataTypes.STRING,
      dni: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
