const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);

module.exports = sequelize;

const databaseConnexion = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie....");
    // await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Impossible de se connecter à la base de données:", error);
  }
};

module.exports = { databaseConnexion, sequelize };
