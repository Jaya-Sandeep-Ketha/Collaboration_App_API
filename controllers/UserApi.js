const { authorizeUser } = require("../services/userService");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authorizeUser(email, password);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.employee_id,
        name: `${user.employee_fname} ${user.employee_lname}`,
        email: user.email,
        title: user.title,
        location: user.location,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(401).json({ message: error.message });
  }
};
