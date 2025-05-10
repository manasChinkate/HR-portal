const mongoose = require("mongoose");

const pendingLeave = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Employee",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Company",
    },
    pendingLeaves: {
      type: [
        {
          leaveType: String,
          count: String,
        },
      ],
      default: [], // Initially empty array
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "PendingLeave" }
);

const pendingLeavesModel = mongoose.model("PendingLeave", pendingLeave);

module.exports = pendingLeavesModel;
