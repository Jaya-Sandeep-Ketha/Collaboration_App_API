const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS, // Your App Password or Gmail password (if "less secure apps" is enabled)
  },
});

const sendPasswordEmail = async (recipient, password) => {
  const mailOptions = {
    from: '"Touch Portal" <your-email@gmail.com>', // Sender address
    to: recipient, // Recipient email
    subject: "Welcome to Touch Portal - Your Credentials",
    text: `Welcome to Touch Portal!\n\nHere are your credentials:\nEmail: ${recipient}\nPassword: ${password}\n\nPlease log in and change your password.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password email sent to ${recipient}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendPasswordEmail;
