const jwt = require('jsonwebtoken');
const LoginSchema = require('../models/Login'); // Adjust the path as needed

const Checking = async (req, res) => {
    try {
        const token = req.headers.token;
        const { authority } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify and decode the token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || 'jwt-secret-key'); // Use environment variable
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        if (!decodedToken) {
            return res.status(401).json({ message: 'Error decoding token' });
        }

        const { email, username, companyName } = decodedToken;
        if (!email || !companyName) {
            return res.status(400).json({ message: 'Token missing required fields' });
        }

        try {
            // Check for both email and companyName
            const user = await LoginSchema.findOne({ email, companyName });
            if (user) {
                return res.status(200).json({
                    message: "Successfully Checked",
                    Checked: {
                        email: user.email,
                        username: user.name,
                        companyName: user.companyName,
                        authority: user.authority,
                        userId:user.employeeId,
                        companyId:user.companyId,
                    },
                });
            } else {
                return res.status(404).json({ message: "Unidentified User" });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ message: "Error fetching user data" });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ message: "Error getting Info" });
    }
};

module.exports = Checking;
