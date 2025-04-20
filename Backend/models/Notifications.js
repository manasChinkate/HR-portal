const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newEmployee', // Assuming this is your employee model
        required: true,
    },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newCompnany',
        required: true,
    }
});

const NotificationModel = mongoose.model('Notification', notificationSchema);
module.exports = NotificationModel;
