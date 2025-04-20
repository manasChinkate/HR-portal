const LeavetypeModel = require("../models/LeaveType");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("../models/NewEmployee");
const pendingLeavesModel = require("../models/PendingLeaves");

const LeaveType = async (req, res) => {
  const { count, leaveType } = req.body;

  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  // Verify and decode the token to get the companyName
  const decodedToken = jwt.verify(token, "jwt-secret-key"); // Replace 'jwt-secret-key' with your actual secret key
  const companyName = decodedToken.companyName;

  const employees = await EmployeeModel.find({ companyName });
  const pendingLeaves = await pendingLeavesModel.find({ companyName });
  console.log("PENDING", pendingLeaves);

  let temp = [];
  for (let i = 0; i < employees.length; i++) {
    const existingEmployee = await pendingLeavesModel.findOne({
      employeeId: employees[i].employeeId,
    });

    if (existingEmployee) {
      console.log("EXISTINGGGGGG");
      // Push new leave data to the existing employee's pendingLeaves array
      existingEmployee.pendingLeaves.push({
        leaveType: leaveType,
        companyName: companyName,
        count: String(count), // Ensure count is a string if schema requires it
      });

      // Save the updated document to MongoDB
      await existingEmployee.save();
    } else {
      // Create a new entry for employees not found
      temp.push({
        employeeId: employees[i].employeeId,
        companyName: companyName,
        pendingLeaves: [{ leaveType: leaveType, count: String(count) }],
      });
    }
  }

  console.log("TEMPPP", temp);

  // Insert new employees in bulk if any
  if (temp.length > 0) {
    const finalLeaves = await pendingLeavesModel.insertMany(temp);
    console.log("finalLeaves", finalLeaves);
  } else {
    console.log("No new employees to insert.");
  }

  const data = req.body;
  try {
    const leavetype = LeavetypeModel.create(data);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading leave type" });
  }
};

const getLeaveType = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  // Verify and decode the token to get the companyName
  const decodedToken = jwt.verify(token, "jwt-secret-key"); // Replace 'jwt-secret-key' with your actual secret key
  const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload

  try {
    const getdata = await LeavetypeModel.find({ companyName });
    console.log(getdata);
    res.status(200).json(getdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching leavetypes" });
  }
};

module.exports = { LeaveType, getLeaveType };
