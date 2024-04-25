var express = require("express");
var router = express.Router();
const { sendEmail } = require("../services/sendEmail");

router.post("/", async (req, res) => {
  const { senderEmail, recipientEmail, subject, text } = req.body;

  try {
    const messageId = await sendEmail(
      senderEmail,
      recipientEmail,
      subject,
      text
    );
    res.status(200).json({ message: "E-mail envoyé avec succès", messageId });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail", error);
    res.status(500).json({
      message: "Erreur lors de l'envoi de l'e-mail",
      error: error.message,
    });
  }
});

module.exports = router;
