const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    authority:String,
    email:String,
    name:String,
    password:String,
    companyName:String,
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }
}, { collection: 'User' })

 const LoginSchema = mongoose.model('User', loginSchema)


 module.exports = LoginSchema


 const data ={
    
    "authority": "MasterAdmin",
    "email": "manas@gmail.com",
    "name": "Manas Chinkate",
    "password": "admin"
  }