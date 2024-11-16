const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Mongoose schema for User
const userSchema = new Schema({
  employee_id: {
    type: String,
    required: true,  // Equivalent to allowNull: false
    unique: true,    // Ensures uniqueness
  },
  employee_fname: {
    type: String,
    required: true,
  },
  employee_lname: {
    type: String,
    required: true,
  },
  chat_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  reports_to: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
    unique: true,  // Ensures uniqueness
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt
});

// Create the Mongoose model
const User = mongoose.model('Users', userSchema);

module.exports = User;