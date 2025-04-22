const mongoose = require("mongoose");
const DepartmentModel = require("../models/Department");
const jwt = require("jsonwebtoken");
const extractToken = require("../db");
const { DepartmentSchema } = require("../Validations/ValidationSchema");

const Department = async (req, res) => {
  const decodedToken = extractToken(req); // Assuming you have a function to extract and verify the token
  const department = {
    ...req.body,
    companyId: decodedToken.companyId,
  };

  const parsed = DepartmentSchema.safeParse(department);

  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
  }

  const data = await DepartmentModel.create(parsed.data);
  // console.log(data)
  res.status(201).json("Created successfully");
};

const GetDepartment = async (req, res) => {
  try {
    const decodedToken = extractToken(req); // Assuming you have a function to extract and verify the token
    const companyId = decodedToken.companyId; // Extract
    // Query the database to find reporting managers for the given company€
    const departments = await DepartmentModel.find({ companyId });

    if (departments.length === 0) {
      return res
        .status(404)
        .json({ message: "No departments found for this company." });
    }

    // Send the found reporting managers as the response
    res.status(200).json({
      data: departments,
      message: "Departments fetched successfully.",
    });
  } catch (error) {
    // Handle any errors that occur during the query
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
};

module.exports = { Department, GetDepartment };
