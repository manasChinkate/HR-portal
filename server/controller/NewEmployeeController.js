const { EmployeeModel } = require("../models/Employee");
const LoginSchema = require("../models/Login");
const jwt = require("jsonwebtoken");
const pendingLeavesModel = require("../models/PendingLeaves");
const { leaveTypeModel } = require("../models/LeaveType");
const extractToken = require("../utils/ExtractToken");
require("../models/Designation");

const handleCreateEmployee = async (req, res) => {
  // const userId = await generateUserId(req.body.companyName)
  const { fullName } = req.body;
  const decodedToken = extractToken(req);
  const companyId = decodedToken.companyId;

  try {
    //Create New Employee
    const employee = {
      ...req.body,
      companyId: companyId,
    };
    const newEmployee = await EmployeeModel.create(employee); //Create Employee Document

    //Create Login Credentials of new Employee
    const loginData = {
      email: req.body.email,
      password:
        req.body.authority === "ProjectManager"
          ? `${fullName.slice(0, 3)}@123`
          : "123456",
      employeeId: newEmployee._id,
      companyId: decodedToken.companyId,
      authority: req.body.authority,
    };

    await LoginSchema.create(loginData);

    const allLeaveTypes = await leaveTypeModel.find({ companyId }); //Create Login Document

    //Initiallize leaves as per company leave policy
    const pendingLeaves = {
      employeeId: newEmployee._id,
      companyId: companyId,
      pendingLeaves: allLeaveTypes.map((leave) => {
        return {
          leaveType: leave._id,
          count: leave.count,
        };
      }),
    };
    await pendingLeavesModel.create(pendingLeaves); //Createing Pending Leave Document

    //Sending response to Client side
    res.status(201).json("Employee Creted successfully");
    console.log("Craeted Employee", employee);
  } catch (error) {
    res.status(500).json("Failed creting Employee");
    console.log("error creating employee", error);
  }
};

const handleGetEmployees = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const companyId = decodedToken.companyId;
    // Query the database to find reporting managers for the given company€
    const Employee = await EmployeeModel.find({ companyId }).populate(
      "designation"
    );
    console.log("Employee", Employee);

    if (Employee.length === 0) {
      return res
        .status(404)
        .json({ message: "No Employee found for this company." });
    }

    // Send the found reporting managers as the response
    res.status(200).json({ data: Employee, message: "Fetched Succesfully" });
  } catch (error) {
    // Handle any errors that occur during the query
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching Employees", error: error.message });
  }
};

module.exports = { handleCreateEmployee, handleGetEmployees };
