const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    email:String,
    password:String,
    // employeeId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: "newEmployee"
        
    // }
}, { collection: 'logindata' })

 const LoginSchema = mongoose.model('login', loginSchema)

 const getLoginDetailsByEmail = async (email) => {
    return await LoginSchema.findOne({ email }).populate('employeeId');
  };
  
 module.exports = {LoginSchema,getLoginDetailsByEmail}