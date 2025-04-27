const mongoose = require('mongoose')

const NewCompnay = new mongoose.Schema({
    fromdate:String,
    todate:String,
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
    employeeId:String,
    createdDate: {
        type: Date,
        default: Date.now
    }
    
    
    

},{ collection: 'newCompnany' }, )

const CompanySchema = mongoose.model("newCompnany",NewCompnay )
module.exports = CompanySchema