const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    companyId: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    date: {
      type: String, // 'YYYY-MM-DD'
      required: true,
    },
    checkInTime: String,   // 'HH:mm:ss'
    checkOutTime: String,  // 'HH:mm:ss'
    totalHours: String,    // e.g., '5h 30m'
    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present",
    },
  },
  { collection: "Attendance" }
);

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
const getAttendanceByEmployeeId = (employeeId) =>
  AttendanceModel.find({ employeeId });

module.exports = {AttendanceModel,getAttendanceByEmployeeId};
