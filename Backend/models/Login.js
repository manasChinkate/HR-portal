const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    authority:String,
    email:String,
    name:String,
    password:String,
    companyName:String
}, { collection: 'logindata' })

 const LoginSchema = mongoose.model('login', loginSchema)

 module.exports = LoginSchema