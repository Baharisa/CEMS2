// backend/routes/eventRoutes.js
const express = require('express');
const pool = require('../config/db'); // Import database connection
const router = express.Router();

// Fetch all events
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        // Ensure the returned events have the expected structure
        const events = result.rows.map(event => ({
            id: event.id, // Ensure you're returning the correct ID
            title: event.name, // Assuming 'name' is the title of the event
            date: event.date, // Assuming 'date' is already in the correct format
            description: event.description // Optional, include if needed
        }));
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to load events' });
    }
});

// Create a new event
router.post('/', async (req, res) => {
    const { name, date, description } = req.body;

    if (!name || !date || !description) {
        return res.status(400).json({ error: 'Missing event details' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO events (name, date, description) VALUES ($1, $2, $3) RETURNING *',
            [name, date, description]
        );
        res.status(201).json({
            id: result.rows[0].id, // Ensure the ID is returned
            title: result.rows[0].name,
            date: result.rows[0].date,
            description: result.rows[0].description
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Register for an event
router.post('/register', async (req, res) => {
    const { eventId, user } = req.body;

    if (!eventId || !user || !user.userName || !user.userEmail) {
        return res.status(400).json({ error: 'Missing registration details' });
    }

    try {
        // Assuming you have a registrations table to record user registrations
        const result = await pool.query(
            'INSERT INTO registrations (event_id, user_name, user_email) VALUES ($1, $2, $3) RETURNING *',
            [eventId, user.userName, user.userEmail]
        );
        res.status(201).json({
            message: 'Successfully registered for the event',
            registration: result.rows[0]
        });
    } catch (error) {
        console.error('Error registering for event:', error);
        res.status(500).json({ error: 'Failed to register for event' });
    }
});

module.exports = router;