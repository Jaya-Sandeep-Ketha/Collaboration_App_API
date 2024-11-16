const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Mongoose schema for Project
const projectSchema = new Schema({
  project_id: {
    type: String,
    required: true,
  },
  company_id: {
    type: String,
    required: true,
  },
  project_name: {
    type: String,
  },
  github_repo_name: {
    type: String,
  },
  project_api_key: {
    type: String,
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt
});

// Create the Mongoose model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;