const nodemailer = require("nodemailer");

async function sendEmail(senderEmail, recipientEmail, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    // console.log("E-mail envoyé: ", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Erreur 124", error);
    throw error;
  }
}

module.exports = {
  sendEmail,
};
