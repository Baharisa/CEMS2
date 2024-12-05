// backend/routes/userRoutes.js
const express = require('express');
const pool = require('../config/db'); // Import the connection pool
const router = express.Router();

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
