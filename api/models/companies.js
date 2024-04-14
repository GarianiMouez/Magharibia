const sequelize = require("../config/db").sequelize;
const { DataTypes } = require("sequelize");

////// add user name password

const Companies = sequelize.define("Companies", {
  rne: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Ename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

module.exports = Companies;
