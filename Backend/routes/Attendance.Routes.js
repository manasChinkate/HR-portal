const express = require("express")
const { handleGetAttendance, handleCheckIn, handleCheckout } = require("../controller/AttendanceController")


const attendanceRouter = express.Router()

attendanceRouter.get('/',handleGetAttendance)
attendanceRouter.post('/checkin',handleCheckIn)
attendanceRouter.post('/checkout',handleCheckout)



module.exports = { attendanceRouter}