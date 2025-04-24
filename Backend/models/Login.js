const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    authority:String,
    email:String,
    name:String,
    password:String,
    companyName:String,
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'newEmployee'
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'newCompnany'
    }
}, { collection: 'logindata' })

 const LoginSchema = mongoose.model('login', loginSchema)


 module.exports = LoginSchema