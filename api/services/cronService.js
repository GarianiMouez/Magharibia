const cron = require("node-cron");
const { sendEmail } = require("./sendEmail");
const clientServices = require("./client");
const contratServices = require("./Pcontract");

const chrono = cron.schedule("0 10 * * *", async () => {
  let displayedClientData = [];
  let displayedContractData = [];
  try {
    const clients = await clientServices.get();
    const contracts = await contratServices.get();
    for (let i = 0; i < clients.length; i++) {
      displayedClientData.push(clients[i].dataValues);
    }
    for (let i = 0; i < contracts.length; i++) {
      displayedContractData.push(contracts[i].dataValues);
    }
    console.log(displayedClientData);
    console.log(displayedContractData);

    const currentDate = new Date();

    for (const contract of contracts) {
      const endDate = new Date(contract.EDate);
      if (endDate <= currentDate) {
        const client = clients.find((c) => c.id === contract.ClientId);
        console.log(client);
        if (client) {
          console.log(`Sending email to ${client.email}...`);
          await sendEmail(
            "mouezghariani2@gmail.com", // Replace with your email
            client.email,
            "Avis d’expiration du contrat",
            `Cher ${client.Fname}, \n \n Votre contrat  a expiré. Veuillez passer en revue votre compte. \n \n Maghrebia Assurance, \n`
          );
          console.log("Email sent successfully!");
        }
      }
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
});

module.exports = { chrono };
