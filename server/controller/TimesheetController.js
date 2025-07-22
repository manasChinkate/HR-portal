const Timesheetmodel = require("../models/Timesheet");
const jwt = require("jsonwebtoken");
const ProjectModel = require("../models/Project")
const TaskModel = require("../models/Task");
const extractToken = require("../utils/ExtractToken");

const handleCreateTimesheet = async (req, res) => {
  try {
    // Verify and decode the token to get the companyName
    const decodedToken = extractToken(req); // Replace 'jwt-secret-key' with your actual secret key
    // console.log(decodedToken)
    const companyId = decodedToken.companyId;
    const employeeId = decodedToken.userId._id;

    const data = {
      ...req.body,
      companyId,
      employeeId
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
    
    const decodedToken = extractToken(req);
    const authority = decodedToken.authority;
    const companyId = decodedToken.companyId;
    const employeeId = decodedToken.userId._id;
    console.log("emp",employeeId)

    let getData;

    if (!authority) {
      console.log("no authority");
    } else {
      if (authority === "Admin") {
        getData = await Timesheetmodel.find({ companyId });
        console.log("eadmin one generated");
      } else {
        getData = await Timesheetmodel.find({ employeeId }).populate("employeeId","fullname").populate("projectId","projectName").populate("taskId","taskTitle");
        console.log("employee one generated");
      }
    }
    // If no leave data is found
    if (getData.length === 0) {
      return res.status(404).json({
        message:
          "No timesheet data found for this user in the specified company",
      });
    }

    // Send the data as response
    res.status(200).json({data:getData});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleCreateTimesheet, handleGetTimesheets };
