const express = require("express")
const { handleGetCompanies, handleCreateCompany } = require("../controller/NewCompanyController")


const companyRouter = express.Router()

companyRouter.get('/',handleGetCompanies)
companyRouter.post('/',handleCreateCompany)



module.exports = { companyRouter}