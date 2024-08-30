const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');  // Ensure jwt is required
const LoginSchema = require('../models/Login');
const EmployeeModel = require('../models/NewEmployee');

const ReportingManager = async (req, res) => {
    console.log(req.headers.token)
    try {
        // Extract the token from the Authorization header
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify and decode the token to get the companyName
        const decodedToken = jwt.verify(token, 'jwt-secret-key'); // Replace 'jwt-secret-key' with your actual secret key
        console.log(decodedToken)
        const companyName = decodedToken.companyName; // Assuming companyName is stored in the token payload
        console.log('decoded companyName:', companyName);

        // Query the database to find reporting managers for the given company
        const reportingManagers = await EmployeeModel.find({ companyName });
        console.log(reportingManagers);

        if (reportingManagers.length === 0) {
            return res.status(404).json({ message: 'No reporting managers found for this company.' });
        }

        // Send the found reporting managers as the response
        res.status(200).json(reportingManagers);
    } catch (error) {
        // Handle any errors that occur during the query or token verification
        res.status(500).json({ message: 'Error fetching reporting managers', error: error.message });
    }
};

module.exports = ReportingManager;
