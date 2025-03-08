const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    name:String,
    email:String,
    leaveType:String,
    count:String,
    department:String,
    from_date:String,
    to_date:String,
    reason:String,
    status:String,
    companyName:String,
    employeeId:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'Leaves'})

const LeaveModel = mongoose.model('leaves',leaveSchema)

module.exports = LeaveModel