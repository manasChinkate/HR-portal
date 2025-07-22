const { CompanyModel } = require("../models/Company");
const LoginSchema = require("../models/Login");
const extractToken = require("../utils/extractToken");

const checkCompanySubsciption = async (req, res, next) => {
  try {
    console.log("MiddleWare Called");
    const decodedToken = extractToken(req);
    const { email, authority } = decodedToken;
    const user = await LoginSchema.findOne({ email }).populate("companyId");
    console.log("USER", user);

    if (authority == "MasterAdmin") {
      next();
      return;
    }

    if (!user || !user.companyId._id) {
      return res.status(401).json({ message: "User or Company not found" });
    }

    const company = user.companyId;
    const today = new Date();
    const toDate = company.toDate;

    if (toDate < today) {
      if (company.status !== false) {
        await CompanyModel.findByIdAndUpdate(company._id, {
          status: false,
        });
      }

      return res.status(403).json({
        message: "Your subscription has ended. Please renew to access.",
      });
    }
    next();
  } catch (error) {
    console.error("Subscription check failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { checkCompanySubsciption };
