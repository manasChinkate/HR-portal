const mongoose = require('mongoose')

const designationSchema = new mongoose.Schema({
    designation:String,
    companyName:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'Designation'})

const DesignationModel = mongoose.model('designation',designationSchema)

module.exports = DesignationModel