const { LeaveModel, LeaveZodSchema } = require("../models/Leave");
const jwt = require("jsonwebtoken");
require("../models/NewEmployee");
const pendingLeavesModel = require("../models/PendingLeaves");
const extractToken = require("../db");
const { leaveTypeModel } = require("../models/LeaveType");

// @desc     Apply Leaves for each employee
// @route    POST /applyleave
// access    private
const handleCreateLeave = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const companyId = decodedToken.companyId;
    const employeeId = decodedToken.userId._id;
    console.log("EMPLOEE", employeeId);

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
const handleGetLeaves = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decodedToken = extractToken(req);
    const employeeId = decodedToken.userId?._id;

    // Fetch all leaves for the company

    // If the user is an Employee, fetch leave data for that specific user in the company
    const leaveData = await LeaveModel.find({ employeeId }).populate(
      "leaveType",
      "leaveType"
    );
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
const handleGetManageLeaves = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const companyId = decodedToken.companyId;
    const leaveData = await LeaveModel.find({ companyId })
      .populate("employeeId", "fullname")
      .populate("leaveType", "leaveType");
    console.log("LEAVES DATA", leaveData);

    if (leaveData.length === 0) {
      return res.status(404).json({
        message: "No leave data found for this user in the specified company",
      });
    }

    // Send the data as response
    res
      .status(200)
      .json({ data: leaveData, message: "Leaves data fetched successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const handleLeaveStatusChange = async (req, res) => {
  const { status, id: leaveId } = req.params;
  const { data } = req.body;
  const token = req.headers.token;
  console.log("DATA", data);

  console.log("ME", data);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const leaveType = await leaveTypeModel.findById(data.leaveType._id);
  console.log("LLLLLLLL", leaveType);

  try {
    // Only decrease leave count if leave is accepted
    if (status === "Accepted") {
      await handleDecreaseLeaveCount(
        data.employeeId._id,
        data.count,
        data.leaveType
      );
    }

    const statusChange = await LeaveModel.findByIdAndUpdate(
      leaveId, // Use leave _id instead of employeeId
      { status },
      { new: true }
    );

    if (!statusChange) {
      return res.status(404).json({ message: "Leave record not found" });
    }

    res.status(200).json({
      message: "Status updated successfully",
      statusChange,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleDecreaseLeaveCount = async (employeeId, count, leaveType) => {
  const employee = await pendingLeavesModel
    .findOne({ employeeId })
    .populate("pendingLeaves.leaveType");
  console.log("Employee-------------------------", employee);
  console.log("PendingLEAVE-------------------------", employee?.pendingLeaves);

  // console.log('LEAVETYPE',leaveType)

  if (!employee) {
    console.log("NO employee found");
  }
  const leave = employee.pendingLeaves.find(
    (e) => e.leaveType.leaveType == leaveType.leaveType
  );
  console.log("Leave", leave);

  if (!leave) {
    console.log("No leave found");
  }
  const newCount = +leave.leaveType.count - +count;
  console.log("newcount",newCount)

  if (newCount < 0) {
    console.log("Not enough Leaves");
  }
  const id = leave.leaveType._id
  const result = await pendingLeavesModel.findOneAndUpdate(
    { employeeId, "pendingLeaves.leaveType": id },
    {              
      $set: {
        "pendingLeaves.$.count": newCount,
      },
    },
    { new: true }
  );
  if (!result) {
    console.log("FAIELDED",result);
  }
};

// @desc     Get pending leaves for each employee
// @route    GET /pendingLeaves
// access    private
const handleGetPendingLeaves = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decodedToken = extractToken(req);
    const employeeId = decodedToken.userId?._id;

    const pendingLeavesData = await pendingLeavesModel
      .find({ employeeId })
      .populate("pendingLeaves.leaveType");
    console.log("Pending", pendingLeavesData);
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
  handleCreateLeave,
  handleGetLeaves,
  handleLeaveStatusChange,
  handleGetManageLeaves,
  handleGetPendingLeaves,
};
