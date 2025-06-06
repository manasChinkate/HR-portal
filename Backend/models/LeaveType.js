const mongoose = require("mongoose");
const { z } = require("zod");

const leaveTypeSchema = new mongoose.Schema(
  {
    leaveType: String,
    count: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "LeaveType" }
);

const leaveTypeZodSchema = z.object({
  leaveType: z.string().min(1, "Leave Type is required"),
  count: z.string().min(1, "Count is required"),
});

const leaveTypeModel = mongoose.model("LeaveType", leaveTypeSchema);

module.exports = { leaveTypeModel, leaveTypeZodSchema };
