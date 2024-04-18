const sequelize = require("../config/db").sequelize;
const companies = require("./companies");
const ship = require("./ship");

const { DataTypes } = require("sequelize");

const EntrepriseContract = sequelize.define("EntrepriseContract", {
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

companies.hasMany(EntrepriseContract);
EntrepriseContract.belongsTo(companies);

ship.hasOne(EntrepriseContract);
EntrepriseContract.belongsTo(ship);

module.exports = EntrepriseContract;
