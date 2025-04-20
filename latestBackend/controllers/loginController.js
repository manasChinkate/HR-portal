const mongoose = require("mongoose");
const { LoginSchema, getLoginDetailsByEmail } = require("../models/Login");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await LoginSchema.find({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          {
            email: user.email,
            username: user.employee.fullname,
            companyName: user.employee.companyName,
            userId: user.employeeId._id,
          },
          "JWT-SECRET-KEY",
          { expiresIn: "1d" }
        );

        console.log("Token", token);
      }else{
        res.status(401).json({message:"Incorrect Password"})
      }
    }
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
};

module.exports = login