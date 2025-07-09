const express = require("express")
const { handleGetCompanies, handleCreateCompany } = require("../controller/CompanyController")


const companyRouter = express.Router()

companyRouter.get('/',handleGetCompanies)
companyRouter.post('/',handleCreateCompany)



module.exports = { companyRouter}