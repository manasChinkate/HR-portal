const CompanySchema = require("../models/NewCompany");
const LoginSchema = require("../models/Login");
const { generateUserId } = require("./NewEmployeeController");

const handleCreateCompany = async (req, res) => {
  const body = req.body;

  console.log("EMPLOYEEIDDD", body);

  try {
    const Companydata = {
      ...req.body,
      authority: "Admin",
    };
  const createdCompany = await CompanySchema.create(Companydata);

    const LoginData = {
      name: req.body.fullname,
      email: req.body.email,
      authority: "Admin",
      password: "admin",
      companyName: req.body.CompanyName,
      companyId: createdCompany._id,
    };
    await LoginSchema.create(LoginData);

    res.status(201);
    res.json("Company Created Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed creating Company");
  }
};

const handleGetCompanies = async (req, res) => {
  try {
    const companies = await CompanySchema.find();
    res.status(200).json(companies);

    console.log(companies);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { handleCreateCompany, handleGetCompanies };
