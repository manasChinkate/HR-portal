// middlewares/checkAuth.js
const CompanyModel = require("../models/CompanyModel");
const LoginSchema = require("../models/LoginSchema");
const extractToken = require("../utils/ExtractToken");

const checkAuth = async (req, res, next) => {
  try {
    const decodedToken = extractToken(req);
    console.log("Decoded Token:", decodedToken);

    if (!decodedToken) {
      return res.status(400).json({ message: "Token missing required fields" });
    }

    const { companyId, userId: employeeId, authority } = decodedToken;

    if (authority === "Admin") {
      const admin = await CompanyModel.findById(companyId);
      if (!admin) {
        return res.status(401).json({ message: "Unauthorized Admin" });
      }

      req.user = {
        email: admin.email,
        username: admin.fullname,
        authority: admin.authority,
        companyId: admin._id,
      };
    } else if (authority === "Employee") {
      const employee = await LoginSchema.findOne({ employeeId }).populate("employeeId");
      if (!employee) {
        return res.status(401).json({ message: "Unauthorized member" });
      }

      req.user = {
        email: employee.email,
        username: employee.employeeId?.fullname,
        companyName: employee.employeeId?.companyName,
        authority: employee.authority,
        userId: employee.employeeId,
        companyId: employee.companyId,
      };
    } else {
      return res.status(400).json({ message: "Invalid authority" });
    }

    next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).json({ message: "Authentication Error" });
  }
};

module.exports = checkAuth;