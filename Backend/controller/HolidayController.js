const mongoose = require('mongoose');
const HolidayModel = require('../models/Holiday');
const jwt = require('jsonwebtoken');
const EmployeeModel = require('../models/NewEmployee');
const NotificationModel = require('../models/Notifications');
const LoginSchema = require('../models/Login');

const Holiday = async (req, res) => {
    const { companyName, holiday } = req.body;

    try {
        // Validate holiday input
        if (!holiday) {
            return res.status(400).json({ message: 'Holiday details are required' });
        }

        // Create holiday in the database
        const data = await HolidayModel.create(req.body);
        console.log('Holiday created:', data);

        // Fetch employees for the given company
        const employees = await LoginSchema.find({ companyName });
        if (!employees.length) {
            return res.status(404).json({ message: 'No employees found for this company' });
        }

        // Create notifications for employees
        const notifications = employees.map((user) => ({
            userId: user._id,
            message: `A new holiday "${holiday}" has been added.`,
            read: false,
            createdAt: new Date(),
            companyName:companyName
        }));

        // Insert notifications into the database
        const notification = await NotificationModel.insertMany(notifications);
        console.log('Notifications created:', notification);

        // Send success response
        res.status(201).json({
            message: 'Holiday created successfully and notifications sent',
            holiday: data,
            notifications,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const GetHoliday = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, 'jwt-secret-key');
        const companyName = decodedToken.companyName;

        console.log('Decoded companyName:', companyName);

        // Query holidays for the given company
        const holiday = await HolidayModel.find({ companyName });
        console.log('Holidays:', holiday);

        if (holiday.length === 0) {
            return res.status(404).json({ message: 'No holidays found for this company.' });
        }

        res.status(200).json(holiday);
    } catch (error) {
        console.error('Error fetching holidays:', error);
        res.status(500).json({ message: 'Error fetching holidays', error: error.message });
    }
};

module.exports = { Holiday, GetHoliday };
