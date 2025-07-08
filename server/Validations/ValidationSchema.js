// validations/departmentValidation.js
const { z } = require("zod");

const DepartmentSchema = z.object({
  department: z.string().min(1, "Department name is required"),
  companyId: z.string().min(1, "Company ID is required"),
});

const ClientSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  contactPersonPhone: z.string().min(1, "Contact person phone is required").max(10, "10 digits required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  companyId: z.string().min(1, "Company ID is required")
});


module.exports = { DepartmentSchema, ClientSchema };
