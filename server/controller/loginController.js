const mongoose = require("mongoose");
const LoginSchema = require("../models/Login");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await LoginSchema.findOne({ email }).populate("employeeId");

    if (user) {
      console.log("user :", user);
      if (user.password === password) {
        console.log("Password matched");

        // Generate JWT token
        const token = jwt.sign(
          {
            email: user.email,
            username: user.name,
            companyName: user.companyName,
            userId: user.employeeId,
            companyId: user.companyId,
            authority: user.authority,

          },
          "jwt-secret-key",
          { expiresIn: "1d" }
        );
        21;

        console.log("Token:", token);
        res.status(200);
        res.json({
          authority: user.authority,
          email: user.email,
          name: user.name,
          token: token,
          companyName: user.companyName,
          userId: user.employeeId,
          companyId: user.companyId,
        });

        // Respond based on user authority
      } else {
        res.status(401).send("Password is incorrect");
      }
    } else {
      res.status(404).send("User not found");
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = handleLogin;
