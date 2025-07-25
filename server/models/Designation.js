const mongoose = require('mongoose')

const designationSchema = new mongoose.Schema({
    designation:String,
    companyName:String,
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'Designation'})

const DesignationModel = mongoose.model('Designation',designationSchema)

module.exports = DesignationModel