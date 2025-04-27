const mongoose = require("mongoose");

const pendingLeave = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "newEmployee",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "addcompnany",
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
  { collection: "PendingLeaves" }
);

const pendingLeavesModel = mongoose.model("PendingLeaves", pendingLeave);

module.exports = pendingLeavesModel;
