const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CompanyModel = mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    company_name:{
      type: String,
      requried: true,
    },
    phoneNumber:{
      type: Number,
      requried: true,
    },
    employee_size:{
      type: Number,
      requried: true,
    },
    Company_email: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      requried: true,
    },
  },
  {
    timeStamp: true,
  }
);

CompanyModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

CompanyModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Company = mongoose.model("Company", CompanyModel);
module.exports = Company;
