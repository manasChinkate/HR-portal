const LoginSchema = require("../models/Login");
const { CompanyModel } = require("../models/Company");
const extractToken = require("../utils/extractToken");

// @desc    Refresh
// @route   POST /checking
// access   private
const handleRefresh = async (req, res) => {
  try {
    const decodedToken = extractToken(req);
    console.log("Decoded Token:", decodedToken);

    if (!decodedToken) {
      return res.status(400).json({ message: "Token missing required fields" });
    }

    const { companyId, userId: employeeId, authority } = decodedToken;

    if (authority === "MasterAdmin") {
      const masterAdmin = await LoginSchema.findOne({ authority });
      if (!masterAdmin) {
        return res.status(401).json({ message: "Unauthorized Admin" });
      }

      return res.status(200).json({
        message: "Successfully Checked",
        Checked: {
          email: masterAdmin.email,
          username: masterAdmin.fullname,
          authority: masterAdmin.authority,
          companyId: masterAdmin._id,
        },
      });
    }
    if (authority === "Admin") {
      const admin = await CompanyModel.findOne({ _id: companyId });
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
    }
    if (authority === "Employee") {
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
    }

    return res.status(400).json({ message: "Invalid authority" });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Error getting Info" });
  }
};

module.exports = handleRefresh;
