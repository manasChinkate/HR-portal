const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    //Personal Details
    fullName: String,
    email: String,
    mobileNo: String,
    gender: String,
    maritialStatus: String,
    adhaarNo: String,
    panNo: String,
    dob: String,
    //Employeement Details
    joiningDate: String,
    probationPeriod: String,
    authority: String,
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
    },
    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    //Address Details
    city: String,
    state: String,
    country: String,
    pincode: Number,
    address: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Employee" }
);

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

const getEmployeeByEmployeeId = async (employeeId) =>
  EmployeeModel.find(employeeId);

module.exports = { EmployeeModel, getEmployeeByEmployeeId };
