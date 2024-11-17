const { Feature, WorksOn, User } = require("../models");

exports.submitForm = async (req, res) => {
  const { email, featureName, description, projectId } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const feature = await Feature.create({
      name: featureName,
      description,
      project_id: projectId,
    });

    await WorksOn.create({
      employee_id: user.employee_id,
      feature_id: feature.id,
    });

    res.status(200).json({ message: "Feature submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Failed to submit form" });
  }
};
