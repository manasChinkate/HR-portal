const mongoose = require('mongoose')

const holidaySchema = new mongoose.Schema({
    holiday:String,
    companyName:String,
    from_date:String,
    to_date:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'Holiday'})

const HolidayModel = mongoose.model('holiday',holidaySchema)

module.exports = HolidayModel