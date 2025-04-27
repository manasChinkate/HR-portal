const extractToken = require("../db");
const LoginSchema = require("../models/Login");
const CompanySchema = require("../models/NewCompany");

// @desc    Authorization of user
// @route   POST /checking
// access   private
const Checking = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    console.log("Decoded Token:", decodedToken);

    if (!decodedToken) {
      return res.status(400).json({ message: "Token missing required fields" });
    }

    const { companyId, userId: employeeId, authority } = decodedToken;

    if (authority === "Admin") {
      const admin = await CompanySchema.findOne({ _id: companyId });
      if (!admin) {
        return res.status(401).json({ message: "Unauthorized Admin" });
      }

      return res.status(200).json({
        message: "Successfully Checked",
        Checked: {
          email: admin.email,
          username: admin.fullname,
          authority: admin.authority,
          companyId: admin._id,
        },
      });
    } else if (authority === "Employee") {
      const employee = await LoginSchema.findOne({ employeeId }).populate(
        "employeeId"
      );
      if (!employee) {
        return res.status(401).json({ message: "Unauthorized member" });
      }

      return res.status(200).json({
        message: "Successfully Checked",
        Checked: {
          email: employee.email,
          username: employee.employeeId?.fullname,
          companyName: employee.employeeId?.companyName,
          authority: employee.authority,
          userId: employee.employeeId,
          companyId: employee.companyId,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid authority" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error getting Info" });
  }
};

module.exports = Checking;
