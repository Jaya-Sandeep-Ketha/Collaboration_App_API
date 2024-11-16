const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
    feature_id: {
        type: Number, // Equivalent to INTEGER in Sequelize
        required: true,
        unique: true,
    },
    project_id: {
        type: String, // Equivalent to STRING in Sequelize
        required: false,
    },
    employee_id: {
        type: String, // Equivalent to STRING in Sequelize
        required: false,
    },
    feature_name: {
        type: String, // Equivalent to STRING in Sequelize
        required: false,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Feature', FeatureSchema);