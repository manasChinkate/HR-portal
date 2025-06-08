const Timesheetmodel = require("../models/Timesheet");
const jwt = require("jsonwebtoken");

const handleCreateTimesheet = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    console.log("TIME",req.body)

    // Verify and decode the token to get the companyName
    const decodedToken = jwt.verify(token, "jwt-secret-key"); // Replace 'jwt-secret-key' with your actual secret key
    // console.log(decodedToken)
    const email = decodedToken.email;
    const name = decodedToken.username; // Assuming companyName is stored in the token payload
    const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
    // console.log('decoded email:', email);
    const data = {
      ...req.body,
      name,
      email,
      companyName,
    };

    const AddTimesheet = await Timesheetmodel.create(data);
    res.status(201).json("Timesheet filled successfully");
    console.log("Timesheet filled", AddTimesheet);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const handleGetTimesheets = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jwt.verify(token, "jwt-secret-key");

    console.log("decodedToken :", decodedToken);
    const email = decodedToken.email;
    const companyName = decodedToken.companyName;
    const authority = req.headers.authority;

    let getData;

    if (!authority) {
      console.log("no authority");
    } else {
      if (authority === "Admin") {
        getData = await Timesheetmodel.find({ companyName });
        console.log("eadmin one generated");
      } else {
        getData = await Timesheetmodel.find({ companyName, email });
        console.log("employee one generated");
      }
    }
    // If no leave data is found
    if (getData.length === 0) {
      return res
        .status(404)
        .json({
          message:
            "No timesheet data found for this user in the specified company",
        });
    }

    // Send the data as response
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleCreateTimesheet, handleGetTimesheets };
