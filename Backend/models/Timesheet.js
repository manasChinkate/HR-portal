const mongoose = require("mongoose");

const timesheetschema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    taskDesc: String,
    date: String,
    startTime: String,
    endTime: String,
    totalTime: String,
  },
  { collection: "Timesheet" }
);

const Timesheetmodel = mongoose.model("timesheet", timesheetschema);

module.exports = Timesheetmodel;
