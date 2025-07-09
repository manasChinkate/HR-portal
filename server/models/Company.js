const mongoose = require("mongoose");
const { z } = require("zod");

const CompanySchema = new mongoose.Schema(
  {
    fromDate: String,
    toDate: String,
    ownerName: String,
    email: String,
    mobileNo: String,
    gender: String,
    aadharNumber: Number,
    panNumber: String,
    companyName: String,
    companyPrefix: String,
    noOfEmployee: Number,
    city: String,
    state: String,
    country: String,
    pincode: String,
    address: String,
    authority: String,
    status: Boolean,
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Company" }
);

const CompanyModel = mongoose.model("Company", CompanySchema);

const CompanyZodSchema = z.object({
  fromDate: z.string(),
  toDate: z.string(),
  ownerName: z.string(),
  email: z.string().email(),
  mobileNo: z.string().regex(/^\d{10,15}$/, "Invalid mobile number"),
  gender: z.enum(["male", "female", "other"]),
  aadharNumber: z.string().regex(/^\d{12}$/, "Aadhar must be 12 digits"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN"),
  companyName: z.string(),
  companyPrefix: z.string(),
  noOfEmployee: z.string().regex(/^\d+$/, "Must be a number"),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
  address: z.string(),
  authority: z.string(),
  status: z.boolean(),
  createdDate: z.date().optional(),
});

module.exports = { CompanyModel, CompanyZodSchema };
