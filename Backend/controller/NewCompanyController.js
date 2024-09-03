
const CompanySchema = require('../models/NewCompany')
const LoginSchema = require('../models/Login')

const AddnewCompany = async (req, res) => {

    const Companydata = {
        ...req.body,
        authority: "Admin",
    }

    const LoginData = {
        name: req.body.fullname,
        email: req.body.email,
        authority: "Admin",
        password: "admin",
        companyName: req.body.CompanyName
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

const GetCompany = async (req, res) => {

    try {
        const companies = await CompanySchema.find()
        res.status(200).json(companies)

        console.log(companies)
    } catch (error) {
        console.log("error",error)
    }

}

module.exports = { AddnewCompany, GetCompany }