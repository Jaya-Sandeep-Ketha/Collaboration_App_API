const schedule = require("node-schedule");
const { User } = require("../models");
const { sendFeatureFormEmail } = require("./emailService");

const scheduleEmails = () => {
  schedule.scheduleJob("0 8 * * 1/2", async () => {
    try {
      const users = await User.findAll({ attributes: ["email"] });

      for (const user of users) {
        const formLink = `https://example.com/feature-form?user=${encodeURIComponent(
          user.email
        )}`;
        await sendFeatureFormEmail(user.email, formLink);
      }

      console.log("Emails sent to all users.");
    } catch (error) {
      console.error("Error scheduling emails:", error);
    }
  });
};

module.exports = scheduleEmails;
