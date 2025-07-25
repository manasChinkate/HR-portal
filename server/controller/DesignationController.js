const mongoose = require("mongoose");
const DesignationModel = require("../models/Designation");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const extractToken = require("../utils/ExtractToken");

const handleCreateDesignation = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify and decode the token to get the companyName
  const decodedToken = jwt.verify(token, "jwt-secret-key");
  const designation = {
    ...req.body,
    companyId: decodedToken.companyId,
  };

  if (designation) {
    const data = await DesignationModel.create(designation);
    console.log(data);
    res.status(201).json("Created successfully");
  } else {
    res.status(500).json("Error Creating ");
    console.log("error");
  }
};

const handleGetDesignation = async (req, res) => {
  try {
    // Verify and decode the token to get the companyName
    const decodedToken = extractToken(req); // Replace 'jwt-secret-key' with your actual secret key
    const companyId = decodedToken.companyId; // Assuming companyName is stored in the token payload

    // Query the database to find reporting managers for the given company€
    const designations = await DesignationModel.find({ companyId });
    // console.log(designations)

    if (designations.length === 0) {
      return res
        .status(404)
        .json({ message: "No designations found for this company." });
    }

    // Send the found reporting managers as the response
    res
      .status(200)
      .json({
        data: designations,
        message: "Designations fetched successfully",
      });
  } catch (error) {
    // Handle any errors that occur during the query
    res
      .status(500)
      .json({ message: "Error fetching designations", error: error.message });
  }
};

module.exports = { handleCreateDesignation, handleGetDesignation };
