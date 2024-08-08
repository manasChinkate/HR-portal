const mongoose = require('mongoose')

const NewCompnay = new mongoose.Schema({
    fullname:String,
    email:String,
    MobileNo:String,
    Gender:String,
    AadharNumber:Number,
    PanNumber:String,
    CompanyName:String,
    CompanyPrefix:String,
    NoofEmployee:Number,
    city:String,
    state:String,
    country:String,
    pincode:Number,
    address:String,
    authority:String,
    
    

},{ collection: 'newCompnany' }, )

const CompanySchema = mongoose.model("company",NewCompnay )
module.exports = CompanySchema