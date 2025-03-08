
const CompanySchema = require('../models/NewCompany')
const LoginSchema = require('../models/Login')
const { generateUserId } = require('./NewEmployeeController')

const AddnewCompany = async (req, res) => {

const body = req.body

    console.log("EMPLOYEEIDDD",body)

    const Companydata = {
        ...req.body,
        authority: "Admin",
        employeeId:generateUserId(req.body.CompanyName)
    }

    const LoginData = {
        name: req.body.fullname,
        email: req.body.email,
        authority: "Admin",
        password: "admin",
        companyName: req.body.CompanyName,
        employeeId:generateUserId(req.body.CompanyName)

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