const { LeaveModel, LeaveZodSchema } = require("../models/Leave");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("../models/NewEmployee");
const pendingLeavesModel = require("../models/PendingLeaves");
const extractToken = require("../db");

// @desc     Apply Leaves for each employee
// @route    POST /applyleave
// access    private
const applyLeave = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const  companyId  = decodedToken.companyId;
    const employeeId = decodedToken.userId._id;
    console.log("EMPLOEE",employeeId)

    const parsed = LeaveZodSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid Data", errors: parsed.error.errors });
    }

    const data = {
      ...req.body,
      status: "pending",
      employeeId,
      companyId,
    };

    const appliededLeave = await LeaveModel.create(data);
    if (appliededLeave) {
      res
        .status(201)
        .json({ data: appliededLeave, message: "Leave applied succesfully" });
    } else {
      res.status(201).json({ message: "Failed applying leave" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

// @desc     Get applieded leaves for each employee
// @route    GET /getapplyleave
// access    private
const getLeaveData = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decodedToken = extractToken(req);
    const { companyId, employeeId } = decodedToken;

    // Fetch all leaves for the company

    // If the user is an Employee, fetch leave data for that specific user in the company
    const leaveData = await LeaveModel.find({ employeeId });
    // If no leave data is found
    if (leaveData.length === 0) {
      return res.status(404).json({
        message: "No leave data found for this user",
      });
    }

    // Send the data as response
    res
      .status(200)
      .json({ data: leaveData, message: "Leaves fetched successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc     Fetch leaves data to (Accept/Reject) leaves = Admin
// @route    GET /getmanageleave
// access    private
const getManageLeaveData = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const companyId = decodedToken.companyId;
    const leavesData = await LeaveModel.find({ companyId });

    if (leavesData.length === 0) {
      return res.status(404).json({
        message: "No leave data found for this user in the specified company",
      });
    }

    // Send the data as response
    res
      .status(200)
      .json({ data: leavesData, message: "Leaves data fetched successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const StatusChange = async (req, res) => {
  const status = req.params.status;
  const employeeId = req.params.id;
  const { data } = req.body;

  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decodedToken = jwt.verify(token, "jwt-secret-key");
  // console.log(decodedToken)
  console.log("BODYYYYY", data);

  try {
    if (status === "Accepted") {
      await decreaseCount(employeeId, data.count, data.leaveType);
    }
    const statusChange = await LeaveModel.findOneAndUpdate(
      { employeeId: employeeId }, // Find leave record by ID and companyName
      { status: status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!statusChange) {
      return res.status(404).json({ message: "Leave record not found" });
    }

    res
      .status(200)
      .json({ message: "Status updated successfully", statusChange });
  } catch (error) {
    console.log(error);
  }
};

const decreaseCount = async (employeeId, count, leaveType) => {
  const employee = await pendingLeavesModel.findOne({ employeeId });
  console.log("Employee-------------------------", employee);
  console.log("PendingLEAVE-------------------------", employee?.pendingLeaves);

  if (!employee) {
    console.log("NO employee found");
  }
  const leave = employee.pendingLeaves.find((e) => e.leaveType == leaveType);

  if (!leave) {
    console.log("No leave found");
  }
  const newCount = +leave.count - +count;

  if (newCount < 0) {
    console.log("Not enough Leaves");
  }
  const result = await pendingLeavesModel.findOneAndUpdate(
    { employeeId, "pendingLeaves.leaveType": leaveType },
    {
      $set: {
        "pendingLeaves.$.count": newCount,
      },
    },
    { new: true }
  );
  if (result) {
    console.log("COunt updated successfulyy");
  }
};

// @desc     Get pending leaves for each employee
// @route    GET /pendingLeaves
// access    private
const getPendingLeaves = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decodedToken = extractToken(req);
    const employeeId = decodedToken.userId._id;
    console.log("EMPLOYEE", employeeId);

    const pendingLeavesData = await pendingLeavesModel.find({ employeeId });
    if (pendingLeavesData.length == 0) {
      return res.status(404).json({ message: "No Pending Leaves" });
    } else {
      res.status(200).json({
        data: pendingLeavesData[0]?.pendingLeaves,
        message: "Pending leaves Data fetched successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

module.exports = {
  applyLeave,
  getLeaveData,
  StatusChange,
  getManageLeaveData,
  getPendingLeaves,
};
