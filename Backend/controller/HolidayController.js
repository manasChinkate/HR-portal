const mongoose = require("mongoose");
const HolidayModel = require("../models/Holiday");
const jwt = require("jsonwebtoken");
const { EmployeeModel } = require("../models/NewEmployee");
const NotificationModel = require("../models/Notifications");
const LoginSchema = require("../models/Login");
const { sendNotifications } = require("./NotificationController");
const extractToken = require("../utils/ExtractToken");
const handleCreateHoliday = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decodedToken = jwt.verify(token, "jwt-secret-key");
  const holiday = {
    ...req.body,
    companyId: decodedToken.companyId,
  };
  try {
    // Validate holiday input
    if (!holiday) {
      return res.status(400).json({ message: "Holiday details are required" });
    }

    // Create holiday in the database
    const data = await HolidayModel.create(holiday);
    console.log("Holiday created:", data);

    // Fetch employees for the given company
    await sendNotifications(
      decodedToken.companyId,
      `${data.holiday}, Holiday has been created`
    );

    // Send success response
    res.status(201).json({
      message: "Holiday created successfully and notifications sent",
      holiday: data,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const handleGetHoliday = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    const companyId = decodedToken.companyId;

    console.log("Decoded companyId:", companyId);

    // Query holidays for the given company
    const holiday = await HolidayModel.find({ companyId });
    console.log("Holidays:", holiday);

    if (holiday.length === 0) {
      return res
        .status(404)
        .json({ message: "No holidays found for this company." });
    }

    res
      .status(200)
      .json({ data: holiday, message: "Holidays fetched successfully" });
  } catch (error) {
    console.error("Error fetching holidays:", error);
    res
      .status(500)
      .json({ message: "Error fetching holidays", error: error.message });
  }
};

module.exports = { handleCreateHoliday, handleGetHoliday };
