const { leaveTypeModel, leaveTypeZodSchema } = require("../models/LeaveType");
const jwt = require("jsonwebtoken");
const { EmployeeModel } = require("../models/NewEmployee");
const pendingLeavesModel = require("../models/PendingLeaves");
const extractToken = require("../db");

// @desc     Create LeaveTypes for company and each employee of companies
// @route    POST /addleavetype
// access    private
const createLeaveType = async (req, res) => {
  const { count, leaveType } = req.body;
  const decodedToken = extractToken(req);
  const companyId = decodedToken.companyId;
  const employees = await EmployeeModel.find({ companyId });
  const pendingLeaves = await pendingLeavesModel.find({ companyId });

  const parsed = leaveTypeZodSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
  }

  let temp = [];
  for (let i = 0; i < employees.length; i++) {
    const existingEmployee = await pendingLeavesModel.findOne({
      employeeId: employees[i]._id,
    });

    if (existingEmployee) {
      console.log("EXISTINGGGGGG");
      // Push new leave data to the existing employee's pendingLeaves array
      existingEmployee.pendingLeaves.push({
        leaveType: leaveType,
        count: "" + count, // Ensure count is a string if schema requires it
      });

      // Save the updated document to MongoDB
      await existingEmployee.save();
    } else {
      // Create a new entry for employees not found
      temp.push({
        employeeId: employees[i]._id,
        companyId: companyId,
        pendingLeaves: [{ leaveType: leaveType, count: "" + count }],
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

  try {
    const leaveTypeData = leaveTypeModel.create({ ...req.body, companyId });
    res
      .status(201)
      .json({ message: "LeaveType created successfully", data: leaveTypeData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating leave type" });
  }
};

// @desc     Fetch leaveTypes for each company
// @route    GET /getleavetype
// access    private
const getLeaveType = async (req, res) => {
  const decodedToken = extractToken(req);
  const companyId = decodedToken.companyId;

  try {
    const getData = await leaveTypeModel.find({ companyId });
    console.log(getData);
    res
      .status(200)
      .json({ message: "Leave Type data fetched successfully", data: getData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching leavetypes" });
  }
};

module.exports = { createLeaveType, getLeaveType };
