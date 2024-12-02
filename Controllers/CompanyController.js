const generateToken = require("../Config/GenerateToken");
const Company = require("../Models/CompaniesModel"); // Import the Company model
const expressAsyncHandler = require("express-async-handler");

// Login
const loginController = expressAsyncHandler(async (req, res) => {
  const { Company_email, password } = req.body;

  // Fetch the company using the company_name
  const company = await Company.findOne({ Company_email });

  if (company && (await company.matchPassword(password))) {
    const response = {
      _id: company._id,
      Company_email: company.Company_email,
      token: generateToken(company._id),
    };
    res.json(response);
  } else {
    res.status(401);
    throw new Error("Invalid Company email or Password");
  }
});

// Registration
const registerController = expressAsyncHandler(async (req, res) => {
  await top10ComapnyConterorsController();
  const { name, company_name, Company_email, phoneNumber, employee_size, password } = req.body;

  // Check if all required fields are present
  if (!name || !company_name || !Company_email || !phoneNumber || !employee_size || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if the company email already exists
  const companyEmailExist = await Company.findOne({ Company_email });
  if (companyEmailExist) {
    throw new Error("Company with this email already exists");
  }

  // Check if the company name already exists
  const companyNameExist = await Company.findOne({ company_name });
  if (companyNameExist) {
    throw new Error("Company name is already taken");
  }

  // Create a new company entry in the database
  const company = await Company.create({
    name,
    company_name,
    Company_email,
    phoneNumber,
    employee_size,
    password,
  });

  if (company) {
    res.status(201).json({
      _id: company._id,
      name: company.name,
      company_name: company.company_name,
      Company_email: company.Company_email,
      employee_size: company.employee_size,
      phoneNumber: company.phoneNumber,
      token: generateToken(company._id),
    });
  } else {
    res.status(400);
    throw new Error("Company registration failed");
  }
});

// Fetch All Companies 
const fetchAllCompaniesController = expressAsyncHandler(async (req, res) => {
  const companies = await Company.find(); // Fetch all companies
  res.json(companies); // Return the companies in the response
});


// api for getting top 10 companies

let cashedTopUsers = [];
const top10ComapnyConterorsController = expressAsyncHandler(async (req, res) =>{
  try {
    const topCompany = await Company.find()
    .sort({employee_size: -1})
    .limit(5);
   cashedTopUsers = topCompany;  
   if(res){
    res.json(cashedTopUsers);
   }
   console.log('Top users updated:', cachedTopUsers);
  } catch (error) {
      console.error('Error updating top users:', error);
      if(res){
        res.status(500).json({message: 'Failed to get top 10 companies.'});
      }
  }
})

module.exports = {
  loginController,
  registerController,
  fetchAllCompaniesController,
  top10ComapnyConterorsController,
  cashedTopUsers,
};
