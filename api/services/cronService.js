const cron = require("node-cron");
const { sendEmail } = require("./sendEmail");
const services = require("./client");

const chrono = cron.schedule("* * * * *", async () => {
  try {
    // const data = await services.get();
    let displayedData = [];
    // for (let i = 0; i < data.length; i++) {
    //   displayedData.push(data[i].dataValues);
    // }
    // console.log("message data ", displayedData);
    // console.log("Envoi de l'e-mail...");
    // khkhkhkhkhkhkhkh
    // await sendEmail(
    //   "mouezghariani2@gmail.com",
    //   "mouezghariani22@gmail.com",
    //   "Sujet du test d'e-mail toute consome data",
    //   `Date d'envoi : ${displayedData[1].Fname}`
    // );
    // fgfgfgfgfg
    // console.log("E-mail envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
  }
});

module.exports = { chrono };
