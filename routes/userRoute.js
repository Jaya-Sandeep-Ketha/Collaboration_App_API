const express = require('express');
const router = express.Router();
const { UserLogin } = require('../controllers/UserApi');
const { ProjectsDetails } = require('../controllers/ProjectDetailsApi');

// POST route
router.post('/user', UserLogin);
router.post('/projectdetails',ProjectsDetails);

module.exports = router;
