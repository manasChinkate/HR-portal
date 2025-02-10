const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const NotificationModel = require('../models/Notifications');

const getNotifications = async (req, res) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, 'jwt-secret-key');
        const userId = decodedToken.userId;

        console.log("Decoded User ID:", userId);

        // Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        // Query notifications
        const notifications = await NotificationModel.find({ userId: objectId }).populate('userId');

        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for the user.' });
        }

        return res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { getNotifications };
