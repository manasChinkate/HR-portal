const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "newEmployee",
    },
    date: String,
    status: String,
    checkInTime: String,
    checkOutTime: String,
    totalhours: String,
  },
  { collection: "Attendance" }
);

const AttendanceModel = mongoose.model("attendance", attendanceSchema);
const getAttendanceById = (employeeId=>AttendanceModel.findById(employeeId))

module.exports = {AttendanceModel,getAttendanceById};
