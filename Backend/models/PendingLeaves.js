const mongoose = require('mongoose')

const pendingLeave = new mongoose.Schema({
    employeeId:String,
    companyName:String,
    pendingLeaves: {
        type: [
            {
                leaveType: String,
                count: String
            }
        ],
        default: []  // Initially empty array
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'PendingLeaves'})

const pendingLeavesModel = mongoose.model('pendingLeaves',pendingLeave)

module.exports = pendingLeavesModel