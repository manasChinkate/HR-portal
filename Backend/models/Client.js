const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    clientName:String,
    state:String,
    country:String,
    companyName:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{collection:'Clients'})

const Clientmodel = mongoose.model('client',clientSchema)

module.exports = Clientmodel