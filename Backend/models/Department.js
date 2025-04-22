const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    department:String,
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'newcompnany'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'Department'})

const DepartmentModel = mongoose.model('department',departmentSchema)

module.exports = DepartmentModel