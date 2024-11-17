const csv = require("csv-parser");
const { User, Project, Work } = require("../models");
const axios = require("axios"); // To fetch CSV from S3
const { sendPasswordEmail } = require("./emailService");
const bcrypt = require("bcrypt");

const generatePassword = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

exports.parseCSVAndSave = async (fileUrl, company_code) => {
  const rows = [];

  try {
    // Fetch CSV from S3 and parse it
    const response = await axios.get(fileUrl, { responseType: "stream" });

    return new Promise((resolve, reject) => {
      response.data
        .pipe(csv())
        .on("data", async (row) => {
          rows.push(row);
        })
        .on("end", async () => {
          console.log("CSV file successfully processed.");

          // Process each row sequentially to avoid race conditions
          for (const row of rows) {
            try {
              // Save to Projects table
              const project = await Project.create({
                project_id: row.Project_Id,
                project_name: row.project_name,
                github_repo_name: row.github_repo_name,
                company_code,
              });

              // Generate random password for the user
              const password = generatePassword();

              // Hash the password
              const hashedPassword = await bcrypt.hash(password, 10);

              // Save to Users table
              const user = await User.create({
                employee_id: row.employee_id,
                employee_fname: row.employee_fname,
                employee_lname: row.employee_lname,
                chat_name: row.chat_name,
                location: row.location,
                title: row.title,
                reports_to: row.reports_to,
                email: row.email,
                company_code: company_code, // Use companyCode instead of companyName
                project_id: project.project_id, // Optional: Linking to project if needed
                password: hashedPassword,
              });

              // Populate Work table
              await Work.create({
                employee_id: user.employee_id,
                project_id: project.project_id,
              });

              // Send email with credentials
              await sendPasswordEmail(user.email, password);
              console.log(
                `Email sent to ${user.email} with generated password.`
              );
            } catch (innerError) {
              console.error(
                `Error processing row for user ${row.email}:`,
                innerError
              );
            }
          }

          resolve();
        })
        .on("error", (error) => {
          console.error("Error parsing CSV:", error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error fetching CSV from S3:", error);
    throw error;
  }
};
