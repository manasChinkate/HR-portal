const mongoose = require('mongoose')
 


const attendanceSchema = new mongoose.Schema({
    companyName: String,
    email:String,
    date:String,
    status: String,
    checkInTime: String,
    checkOutTime: String,
    totalhours: String,
    

},{collection:'Attendance'})

const AttendanceModel = mongoose.model('attendance',attendanceSchema)

module.exports = AttendanceModel






  