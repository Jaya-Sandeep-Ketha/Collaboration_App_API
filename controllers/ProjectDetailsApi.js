const Project = require('../models/Project'); // Path to Project model
const Company = require('../models/Company'); // Path to Company model
const Feature = require('../models/Feature'); // Path to Feature model
const User = require('../models/User'); // Path to User model

exports.ProjectsDetails = async (req, res) => {
    const { company_name, project_id, feature_id } = req.body;

    try {
        if (!company_name) {
            return res.status(400).json({
                status: 'error',
                message: 'Company name is required',
            });
        }

        // Find companies
        const companies = await Company.find({ company_name: company_name });
        const companyIds = companies.map(company => company.company_id);

        if (!companyIds.length) {
            return res.status(404).json({
                status: 'error',
                message: 'No companies found with the given name',
            });
        }

        // Find projects
        const projectQuery = { 
            company_id: { $in: companyIds },
            ...(project_id && { project_id: project_id })
        };

        const projects = await Project.find(projectQuery);
        
        if (!projects.length) {
            return res.status(404).json({
                status: 'error',
                message: 'No projects found with the given criteria',
            });
        }

        // Extract project IDs
        const projectIds = projects.map(project => project.project_id);

        // Build feature query based on whether feature_id is provided
        const featureQuery = {
            project_id: { $in: projectIds },
            ...(feature_id && { feature_id: feature_id }) // Only add feature_id if it's provided
        };

        console.log('Feature Query:', featureQuery);
        const features = await Feature.find(featureQuery);
        console.log('Features found:', features);

        if (!features.length) {
            return res.status(404).json({
                status: 'error',
                message: feature_id 
                    ? 'No feature found with the given feature ID'
                    : 'No features found for the given project',
            });
        }

        // Get unique employee IDs
        const employeeIds = [...new Set(features.map(feature => feature.employee_id))];
        
        // Find users
        const users = await User.find(
            { employee_id: { $in: employeeIds } },
            'employee_id employee_fname employee_lname email title location'
        );

        // Format response
        const result = features.map(feature => {
            const project = projects.find(p => p.project_id === feature.project_id);
            const featureEmployees = users.filter(user => 
                user.employee_id === feature.employee_id
            );

            return {
                feature_id: feature.feature_id,
                feature_name: feature.feature_name,
                project_id: feature.project_id,
                github_repo_name: project ? project.github_repo_name : null,
                employees: featureEmployees.map(user => ({
                    employee_id: user.employee_id,
                    full_name: `${user.employee_fname} ${user.employee_lname}`,
                    email: user.email,
                    title: user.title,
                    location: user.location
                }))
            };
        });

        res.status(200).json({
            status: 'success',
            data: result,
        });

    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message,
        });
    }
};