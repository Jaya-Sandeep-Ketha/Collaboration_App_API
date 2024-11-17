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

const sendFeatureFormEmail = async (email, formLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Bi-Weekly Feature Update",
    html: `<p>Please fill out the following form for the features you're working on:</p>
             <a href="${formLink}">${formLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${email}`);
};

const sendOnboardingEmail = async (recipientEmail, onboardingFormLink) => {
  const mailOptions = {
    from: `"Platform Onboarding" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "Complete Your Onboarding",
    html: `
        <p>Dear User,</p>
        <p>Welcome to the platform! To complete your onboarding, please fill out the onboarding form by clicking the link below:</p>
        <a href="${onboardingFormLink}" target="_blank">Onboarding Form</a>
        <p>Once completed, you will be added to the platform.</p>
        <p>Thank you,</p>
        <p>The Platform Team</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Onboarding email sent to ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending onboarding email:", error.message);
    throw new Error("Failed to send onboarding email.");
  }
};

module.exports = {
  sendPasswordEmail,
  sendFeatureFormEmail,
  sendOnboardingEmail,
};
