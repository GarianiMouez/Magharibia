const sequelize = require("../config/db").sequelize;
const { DataTypes } = require("sequelize");
//// ajouter user name entreprise

const Client = sequelize.define("Client", {
  Fname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Lname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  BirthDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  tlf: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Client;
