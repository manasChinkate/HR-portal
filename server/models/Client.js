const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    clientName:String,
    state:String,
    country:String,
    contactPerson:String,
    contactPersonPhone:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }
},{collection:'Client'})

const Clientmodel = mongoose.model('Client',clientSchema)

module.exports = Clientmodel