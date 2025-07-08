const express = require("express")
const { handleGetHoliday, handleCreateHoliday } = require("../controller/HolidayController")

const holidayRouter = express.Router()

holidayRouter.get('/',handleGetHoliday)
holidayRouter.post('/',handleCreateHoliday)

module.exports = { holidayRouter}