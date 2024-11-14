const mongoose = require('mongoose')
 


const timesheetschema = new mongoose.Schema({
    companyName: String,
    name:String,
    email:String,
    projectName: String,
    task: String,
    date: String,
    starttime: String,
    endtime: String,
    totaltime: String,
    remarks: String,

},{collection:'Timesheet'})

const Timesheetmodel = mongoose.model('timesheet',timesheetschema)

module.exports = Timesheetmodel