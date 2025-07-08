const { toZonedTime } = require("date-fns-tz");
const { format, differenceInMinutes } = require("date-fns");
const { parse } = require("date-fns");

const extractToken = require("../db");
const {
  AttendanceModel,
  getAttendanceById,
  getAttendanceByEmployeeId,
} = require("../models/Attendance");
const jwt = require("jsonwebtoken");

const IST_TIMEZONE = "Asia/Kolkata";

const handleCheckIn = async (req, res) => {
  const getCurrentISTTime = () => {
    const now = new Date();
    const istTime = toZonedTime(now, IST_TIMEZONE);
    return format(istTime, "hh:mm:ss a"); // Use 12-hour format with AM/PM
  };
  const decodedToken = extractToken(req);
  const employeeId = decodedToken.userId?._id || decodedToken.userId;
  const companyId = decodedToken.companyId;
  const date = format(new Date(), "dd-MM-yyyy");
  const time = getCurrentISTTime();

  const existing = await AttendanceModel.findOne({ employeeId, date });
  if (existing) return res.status(400).json({ message: "Already checked in." });

  const newAttendance = new AttendanceModel({
    employeeId,
    companyId,
    date,
    checkInTime: time,
    status: "Present",
  });

  await newAttendance.save();
  res.json({ message: "Check-in successful", data: newAttendance });
};

const handleCheckOut = async (req, res) => {
  try {
    const now = new Date();
    const istTime = toZonedTime(now, IST_TIMEZONE);
    const checkOutTime = format(istTime, "hh:mm:ss a");
    const currentDate = format(istTime, "dd-MM-yyyy");

    const decodedToken = extractToken(req);
    const employeeId = decodedToken.userId?._id || decodedToken.userId;

    const attendance = await AttendanceModel.findOne({
      employeeId,
      date: currentDate,
    });

    if (!attendance) {
      return res.status(404).json({ message: "Check-in not found for today." });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: "Already checked out." });
    }

    // Parse check-in and check-out time to calculate total hours
    const checkInDateTime = parse(
      `${currentDate} ${attendance.checkInTime}`,
      "dd-MM-yyyy hh:mm:ss a",
      new Date()
    );
    const checkOutDateTime = parse(
      `${currentDate} ${checkOutTime}`,
      "dd-MM-yyyy hh:mm:ss a",
      new Date()
    );

    // Convert to IST before calculating difference
    const zonedCheckIn = toZonedTime(checkInDateTime, IST_TIMEZONE);
    const zonedCheckOut = toZonedTime(checkOutDateTime, IST_TIMEZONE);

    const minutesWorked = differenceInMinutes(zonedCheckOut, zonedCheckIn);
    const hours = Math.floor(minutesWorked / 60);
    const minutes = minutesWorked % 60;

    const totalHours = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} hrs`;

    // Update attendance record
    attendance.checkOutTime = checkOutTime;
    attendance.totalHours = totalHours;

    await attendance.save();

    res.json({
      message: "Check-out successful",
      data: {
        checkOutTime,
        totalhours: totalHours,
      },
    });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleGetAttendance = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const employeeId = decodedToken.userId?._id;
    console.log("employeeId", employeeId);

    const attendance = await getAttendanceByEmployeeId(employeeId);
    console.log("attendance", attendance);

    if (!attendance) {
      return res.status(400).json({ message: "No Attendance found" });
    }
    return res
      .status(200)
      .json({ data: attendance, message: "Attendance fetched" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = { handleCheckIn, handleCheckOut, handleGetAttendance };
