const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Mongoose schema for Company
const companySchema = new Schema({
  company_id: {
    type: String,
    required: true,
    unique: true,  // Ensures uniqueness
  },
  company_name: {
    type: String,
    required: true,  // Equivalent to allowNull: false
  },
  location: {
    type: String,
  },
  api_key: {
    type: String,
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt
});

// Create the Mongoose model
const Company = mongoose.model('Company', companySchema);

module.exports = Company;