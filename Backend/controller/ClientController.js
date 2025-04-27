const extractToken = require("../db");
const Clientmodel = require("../models/Client");
const jwt = require("jsonwebtoken");
const { ClientSchema } = require("../Validations/ValidationSchema");

const AddClient = async (req, res) => {
  const decodedToken = extractToken(req); // Replace 'jwt-secret-key' with your actual secret key

  const data = {
    ...req.body,
    companyId: decodedToken.companyId, // Assuming companyId is stored in the token payload
  };

  const parsed = ClientSchema.safeParse(data);
  if (!parsed.success) {
   return res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
  }

  try {
    const client = await Clientmodel.create(parsed.data);
    res.status(201).json({ message: "Client Added", client: client });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating client", error: error.message });
  }
};

const GetClient = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify and decode the token to get the companyName
  const decodedToken = jwt.verify(token, "jwt-secret-key"); // Replace 'jwt-secret-key' with your actual secret key
  console.log(decodedToken);
  const companyId = decodedToken.companyId; // Assuming companyId is stored in the token payload
  console.log("decoded companyId:", companyId);

  try {
    const clientData = await Clientmodel.find({ companyId });
    console.log(clientData);
    res.status(200).json({ message: "Client fetched", clients: clientData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching client", error: error.message });
  }
};

module.exports = { AddClient, GetClient };
