const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    department:String,
    companyName:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'Department'})

const DepartmentModel = mongoose.model('department',departmentSchema)

module.exports = DepartmentModel