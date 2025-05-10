const express = require("express")
const { handleGetAttendance, handleCheckIn, handleCheckOut } = require("../controller/AttendanceController")


const attendanceRouter = express.Router()

attendanceRouter.get('/',handleGetAttendance)
attendanceRouter.post('/check-in',handleCheckIn)
attendanceRouter.post('/check-out',handleCheckOut)



module.exports = { attendanceRouter}