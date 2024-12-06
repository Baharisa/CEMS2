const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Example route for fetching dashboard data
router.get('/statistics', async (req, res) => {
    try {
        const totalEvents = await pool.query('SELECT COUNT(*) FROM events');
        const upcomingEvents = await pool.query('SELECT COUNT(*) FROM events WHERE date > NOW()');
        const pastEvents = await pool.query('SELECT COUNT(*) FROM events WHERE date < NOW()');
        const totalRegistrations = await pool.query('SELECT COUNT(*) FROM registrations');

        res.json({
            totalEvents: totalEvents.rows[0].count,
            upcomingEvents: upcomingEvents.rows[0].count,
            pastEvents: pastEvents.rows[0].count,
            totalRegistrations: totalRegistrations.rows[0].count
        });
    } catch (error) {
        console.error('Error fetching dashboard statistics:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get recent activities
router.get('/recent-activities', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM activities ORDER BY created_at DESC LIMIT 5');
        res.json({ recentActivities: result.rows });
    } catch (error) {
        console.error('Error fetching recent activities:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
