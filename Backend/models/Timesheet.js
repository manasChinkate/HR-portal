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
      ref: "Projects",
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    taskDesc:String,
    date: String,
    startTime: String,
    endTime: String,
    totalTime: String,
  },
  { collection: "Timesheet" }
);

const Timesheetmodel = mongoose.model("timesheet", timesheetschema);

module.exports = Timesheetmodel;
