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

    //Employeement Details
    joiningDate:String,
    probationPeriod:String,
    authority:String,
    designation: String,
    reportingManager:String,


    //Address Details
    city:String,
    state:String,
    country:String,
    pincode:Number,
    address:String,
    companyName:String,

    createdDate: {
        type: Date,
        default: Date.now
    },
    

},{collection:'newEmployee'})

const EmployeeModel = mongoose.model("employee",EmployeeSchema )
module.exports = EmployeeModel 