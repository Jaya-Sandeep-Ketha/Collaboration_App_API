const User = require("../models").User;
// const bcrypt = require("bcrypt");

exports.UserLogin = async (req, res) => {
  const { email_id, password } = req.body;

  if (!email_id || !password) {
    return res.status(400).json({ error: "Email or Password is missing" });
  }

  try {
    const user = await User.findOne({ where: { email: email_id } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //     return res.status(401).json({ error: 'Invalid email or password' });
    // }

    res.status(200).json({
      status: "OK",
      data: {
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
