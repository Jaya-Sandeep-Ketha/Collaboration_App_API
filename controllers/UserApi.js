const Users = require('../models/User');  // Make sure to import the correct User model
const Project = require('../models/Project');
const Company = require('../models/Company');
const Feature = require('../models/Feature');

exports.UserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email or Password is missing" });
    }

    try {
        // Check if MongoDB is able to insert a test document into the User collection
        const testFeature1 = new Feature({
            feature_id: "0001",
            project_id: "project-1",
            employee_id: "12345672",
            feature_name: "fixing styling of all the headers"
        });

        const testFeature2 = new Feature({
            feature_id: "0002",
            project_id: "project-1",
            employee_id: "12345674",
            feature_name: "changing backend configuration for converting csv to json"
        });

        // Save the test user to MongoDB
        await testFeature1.save()
        await testFeature2.save()
        console.log('Test user inserted successfully.');

        // Now proceed with the original login logic
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // If login is successful, return the user data
        res.status(200).json({
            status: 'OK',
            data: user
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};