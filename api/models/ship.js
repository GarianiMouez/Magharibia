const sequelize = require("../config/db").sequelize;
const client = require("./client");

const { DataTypes } = require("sequelize");

const Ship = sequelize.define("Ship", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mark: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

client.hasMany(Ship);
Ship.belongsTo(client);

module.exports = Ship;
