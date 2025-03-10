const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    //Personal Details
    fullname:String,
    email:String,
    mobileNo:String,
    gender:String,
    maritialStatus:String,
    adhaarNo:String,
    panNo:String,
    dob:String,
    //Employeement Details
    joiningDate:String,
    probationPeriod:String,
    authority:String,
    designation: String,
    reportingManager:String,
    employeeId:String,


    //Address Details
    city:String,
    state:String,
    country:String,
    pincode:Number,
    address:String,
    companyName:String,

    //Pending Leaves
    pendingLeave: {
        type: [
            {
                leaveType: String,
                count: String
            }
        ],
        default: []  // Initially empty array
    },

    createdDate: {
        type: Date,
        default: Date.now
    },
    

},{collection:'newEmployee'})

const EmployeeModel = mongoose.model("employee",EmployeeSchema )
module.exports = EmployeeModel 