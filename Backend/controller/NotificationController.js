const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const NotificationModel = require("../models/Notifications");
const LoginSchema = require("../models/Login"); // Assuming this is your employee model


const handleGetNotification = async (req, res) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, 'jwt-secret-key');
        const userId = decodedToken.userId;

        console.log("Decoded User ID:", userId);

        // Convert userId to ObjectId
        // const objectId = new mongoose.Types.ObjectId(userId);

        // Query notifications
        const notifications = await NotificationModel.find({ userId });

        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for the user.' });
        }

        return res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
const sendNotifications = async (companyId, message) => {
    try {
        // Fetch employees for the given company
        const employees = await LoginSchema.find({ companyId });
        if (!employees.length) {
            console.log("No employees found for this company");
            return;
        }

        // Extract user IDs
        const userIds = employees.map(user => user.employeeId );

        if(!userIds.length) {
            console.log("No user IDs found for this company");
            return;
        }

        const notifications = userIds.map(userId => ({
            userId,
            message,
            read: false,
            createdAt: new Date(),
            companyId,
        }));

        // Insert notifications into the database
        await NotificationModel.insertMany(notifications);
        console.log("Notifications created successfully");

    } catch (error) {
        console.error("Error creating notifications:", error);
    }
};

module.exports = { handleGetNotification, sendNotifications };



