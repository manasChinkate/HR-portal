const mongoose = require('mongoose');
const LoginSchema = require('../models/Login');
const jwt = require('jsonwebtoken');

// Sidebar data moved outside the function
const adminData = [
    { name: 'Home', icon: 'IoHome ', link: '/' },
    { name: 'Add New Company', icon: 'FaBuilding ', link: '/add-new-company' },
    { name: 'Main master', icon: 'GrDomain ', link: '/main-master' },
    { name: 'Project master', icon: '<RiProjectorLine />', link: '/project-master' },
    { name: 'HelpDesk', icon: 'SiHelpdesk ', link: '/helpDesk' },
];

const MasteradminData = [
    { name: 'Home', icon: 'IoHome ', link: '/' },
    { name: 'Add New Company', icon: 'FaBuilding ', link: '/add-new-company' },
    { name: 'HelpDesk', icon: 'SiHelpdesk ', link: '/helpDesk' },
];

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await LoginSchema.findOne({ email });

        if (user) {
            console.log('user :', user)
            if (user.password === password) {
                console.log("Password matched");

                // Generate JWT token
                const token = jwt.sign(
                    { email: user.email, username: user.name, companyName:user.companyName,userId:user.employeeId },
                     "jwt-secret-key",
                    { expiresIn: '1d' }
                );

                console.log("Token:", token);
                res.status(200);
                res.json({
                    authority: user.authority,
                    email: user.email,
                    name: user.name,
                    token: token,
                    companyName:user.companyName,
                    userId:user.employeeId
                })

                // Respond based on user authority
                
            } else {
                res.status(401).send("Password is incorrect");
            }
        } else {
            res.status(404).send("User not found");
            console.log("User not found");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = login;
