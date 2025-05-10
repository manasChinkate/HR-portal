const mongoose = require('mongoose')
const { z } = require('zod')

const CompanySchema = new mongoose.Schema({
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
    createdDate: {
        type: Date,
        default: Date.now
    }
    
    
    

},{ collection: 'Company' }, )

const CompanyModel = mongoose.model("Company",CompanySchema )

const CompanyZodSchema = z.object({
    fromdate: z.string(),
    todate: z.string(),
    fullname: z.string(),
    email: z.string().email(),
    MobileNo: z.string().min(10).max(15), // adjust based on expected format
    Gender: z.string(),
    AadharNumber: z.string(),
    PanNumber: z.string(),
    CompanyName: z.string(),
    CompanyPrefix: z.string(),
    NoofEmployee: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string(),
    address: z.string(),
    authority: z.string(),
    createdDate: z.date().optional(), // default is set by Mongoose
  });
  
module.exports = {CompanyModel,CompanyZodSchema}