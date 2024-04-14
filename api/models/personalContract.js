const sequelize = require("../config/db").sequelize;
const client = require("./client");
const ship = require("./ship");
const { DataTypes } = require("sequelize");

const PersonalContract = sequelize.define("PersonalContract", {
  SDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  EDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  Coqu: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  motor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  netAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

client.hasMany(PersonalContract);
PersonalContract.belongsTo(client);

ship.hasOne(PersonalContract);
PersonalContract.belongsTo(ship);

module.exports = PersonalContract;
