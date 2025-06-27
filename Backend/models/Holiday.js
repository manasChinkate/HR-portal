const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    holiday: {
      required: true,
      type: String,
    },
    holidayType:String,
    fromDate: String,
    toDate: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { collection: "Holiday" }
);

const HolidayModel = mongoose.model("holiday", holidaySchema);

module.exports = HolidayModel;
