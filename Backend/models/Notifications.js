const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    message: { type: String, required: true },
    // projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    companyName: String
});

const NotificationModel = mongoose.model('Notification', notificationSchema);
module.exports = NotificationModel;
