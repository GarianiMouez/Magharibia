const sequelize = require("../config/db").sequelize;
const { DataTypes } = require("sequelize");

const Port = sequelize.define("Port", {
  adress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Port;
