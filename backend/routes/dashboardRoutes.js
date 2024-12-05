// backend/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();

// Example route for fetching dashboard data
router.get('/', (req, res) => {
    // Logic to fetch and return dashboard data
    res.json({ message: 'Dashboard data' });
});

module.exports = router;