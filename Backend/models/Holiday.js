const mongoose = require('mongoose')

const holidaySchema = new mongoose.Schema({
    holiday:String,
    companyName:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'Holiday'})

const HolidayModel = mongoose.model('holiday',holidaySchema)

module.exports = HolidayModel