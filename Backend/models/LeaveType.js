const mongoose = require("mongoose");
const { z } = require("zod");

const leaveTypeSchema = new mongoose.Schema(
  {
    leaveType: String,
    count: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "addcompnany",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "LeaveTypes" }
);

const leaveTypeZodSchema = z.object({
  leaveType: z.string().min(1, "Leave Type is required"),
  count: z.string().min(1, "Count is required"),
  companyId: z.string().min(1, "Company ID is required"),
});

const leaveTypeModel = mongoose.model("leavetypes", leaveTypeSchema);

module.exports = { leaveTypeModel, leaveTypeZodSchema };
