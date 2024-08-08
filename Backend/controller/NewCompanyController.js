
const CompanySchema = require('../models/NewCompany')
const LoginSchema = require('../models/Login')

const AddnewCompany = async(req,res) =>{

    const Companydata = {...req.body,
        authority:"masterAdmin",
    }

    const LoginData = {
        name:req.body.fullname,
        email:req.body.email,
        authority:"masterAdmin",
        password:"admin"
    }
    
    try {
       await CompanySchema.create(Companydata)
       await LoginSchema.create(LoginData)
       
       res.status(201)
       res.json("Company Created Successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json("Failed creating Company")
    }

    

}

module.exports = AddnewCompany