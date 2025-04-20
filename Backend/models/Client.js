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
        ref:'newCompnany'
    }
},{collection:'Clients'})

const Clientmodel = mongoose.model('client',clientSchema)

module.exports = Clientmodel