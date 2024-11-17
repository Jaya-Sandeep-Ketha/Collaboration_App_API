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

const sendOnboardingEmail = async (
  recipientEmail,
  onboardingFormLink,
  loginLink
) => {
  const mailOptions = {
    from: `"Platform Onboarding" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "Complete Your Onboarding",
    html: `
       <p>Hello,</p>
        <p>Before proceeding to the onboarding form, you must log in:</p>
        <a href="${loginLink}">Login Here</a>
        <p>After logging in, please complete the onboarding form using the link below:</p>
        <a href="${onboardingFormLink}">Onboarding Form</a>
        <p><strong>Note:</strong> Logging in is mandatory before accessing the form.</p>
        <p>Thank you!</p>
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
