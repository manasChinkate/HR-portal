const jwt = require("jsonwebtoken");
const LoginSchema = require("../models/Login"); // Adjust the path as needed
const extractToken = require("../db");
const { default: mongoose } = require("mongoose");
const {EmployeeModel} = require('../models/NewEmployee');
const Checking = async (req, res) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode the token
    const decodedToken = extractToken(req);
    // console.log("DECODED",decodedToken)

    if (!decodedToken) {
      return res.status(400).json({ message: "Token missing required fields" });
    }

    const companyId = decodedToken.companyId;
    const userId = decodedToken.userId;

    try {
      // Check for both email and companyName
      const user = await LoginSchema.findOne({
        employeeId: new mongoose.Types.ObjectId(userId),
      });
      console.log("USER", user);
      console.log("USER", user.populate("employeeId"));

      if (user) {
        return res.status(200).json({
          message: "Successfully Checked",
          Checked: {
            email: user.email,
            username: user.name,
            companyName: user.companyName,
            authority: user.authority,
            userId: user.employeeId,
            companyId: user.companyId,
          },
        });
      } else {
        return res.status(404).json({ message: "Unidentified User" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Error fetching user data" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error getting Info" });
  }
};

module.exports = Checking;
