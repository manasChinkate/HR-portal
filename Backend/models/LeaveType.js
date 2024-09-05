const mongoose = require('mongoose')

const leavetypesSchema = new mongoose.Schema({
    leaveType:String,
    count:String,
    companyName:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'LeaveTypes'})

const LeavetypeModel = mongoose.model('leavetypes',leavetypesSchema)

module.exports = LeavetypeModel