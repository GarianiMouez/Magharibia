const sequelize = require("../config/db").sequelize;
const { DataTypes } = require("sequelize");
const Client = require("./client");
const Company = require("./companies");

const Ship = sequelize.define(
  "Ship",
  {
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

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerType: {
      type: DataTypes.ENUM("person", "enterprise"),
      allowNull: false,
    },
  },
  {
    // Indique à Sequelize de ne pas ajouter les contraintes de clé étrangère
    // car nous allons gérer manuellement les associations
    constraints: false,
  }
);

// Définir les associations entre Ship et Client / Company
Ship.belongsTo(Client, {
  foreignKey: "ownerId", // Spécifie le nom de la colonne de référence
  targetKey: "id", // Spécifie la colonne cible dans la table Client
  scope: { ownerType: "person" }, // Filtrer sur le type de propriétaire
});

Ship.belongsTo(Company, {
  foreignKey: "ownerId", // Spécifie le nom de la colonne de référence
  targetKey: "id", // Spécifie la colonne cible dans la table Company
  scope: { ownerType: "enterprise" }, // Filtrer sur le type de propriétaire
});

module.exports = Ship;
