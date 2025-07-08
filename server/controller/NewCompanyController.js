const { CompanyModel, CompanyZodSchema } = require("../models/Company");
const LoginSchema = require("../models/Login");
const { generateUserId } = require("./NewEmployeeController");

const handleCreateCompany = async (req, res) => {
  try {
    const Companydata = {
      ...req.body,
      authority: "Admin",
    };
    const parsed = CompanyZodSchema.safeParse(Companydata);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid data", errors: parsed.error.errors });
    }

    const createdCompany = await CompanyModel.create(parsed.data);

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
    const companies = await CompanyModel.find();
    res.status(200).json({ message: "Companies fetched", data: companies });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { handleCreateCompany, handleGetCompanies };
