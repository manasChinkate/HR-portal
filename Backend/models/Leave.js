const mongoose = require("mongoose");
const { z } = require("zod");

const leaveSchema = new mongoose.Schema(
  {
    leaveType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeaveType",
      require: true,
    },
    count: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      require: true,
    },
    fromDate: String,
    toDate: String,
    reason: String,
    status: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      require: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Leave" }
);

const LeaveModel = mongoose.model("Leave", leaveSchema);

const LeaveZodSchema = z
  .object({
    leaveType: z.string().min(1, "Leave type required"),
    department: z.string().min(1, "department is required"),
    count: z.string().min(1, "Count is required"),
    fromDate: z.string().min(1, { message: "From Date is required" }),
    toDate: z.string().min(1, { message: "To Date is required" }),
    reason: z.string().min(1, "Must be any reason"),
  })
  .refine(
    (data) => {
      const from = new Date(data.fromDate);
      const to = new Date(data.toDate);
      return to > from;
    },
    {
      message: "To Date must be after From Date",
      path: ["toDate"],
    }
  );

module.exports = { LeaveModel, LeaveZodSchema };
