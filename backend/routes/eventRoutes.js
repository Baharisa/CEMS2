const express = require('express');
const pool = require('../config/db'); // Import database connection
const router = express.Router();

// Fetch all events
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        const events = result.rows.map(event => ({
            id: event.id,
            title: event.name,
            date: event.date,
            description: event.description
        }));
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to load events' });
    }
});

// Fetch total events count
router.get('/total-events', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM events');
        res.status(200).json({ totalEvents: result.rows[0].count });
    } catch (error) {
        console.error('Error fetching total events:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Fetch upcoming events count
router.get('/upcoming-events', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM events WHERE date > NOW()');
        res.status(200).json({ upcomingEvents: result.rows[0].count });
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Fetch past events count
router.get('/past-events', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM events WHERE date < NOW()');
        res.status(200).json({ pastEvents: result.rows[0].count });
    } catch (error) {
        console.error('Error fetching past events:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Fetch past events details
router.get('/past', async (req, res) => {
    try {
        // Query to fetch past events
        const result = await pool.query('SELECT * FROM events WHERE date < NOW() ORDER BY date DESC');
        
        // Format the result into a JSON response
        const pastEvents = result.rows.map(event => ({
            id: event.id,
            title: event.name,
            description: event.description,
            date: event.date,
            location: event.location,
            image: event.image || 'default.jpg'  // Use default image if none is available
        }));

        res.status(200).json(pastEvents);
    } catch (error) {
        console.error('Error fetching past events:', error);
        res.status(500).json({ error: 'Failed to fetch past events' });
    }
});

// Fetch total registrations count
router.get('/total-registrations', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM registrations');
        res.status(200).json({ totalRegistrations: result.rows[0].count });
    } catch (error) {
        console.error('Error fetching total registrations:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Register for an event
router.post('/register', async (req, res) => {
    const { eventId, user } = req.body;

    if (!eventId || !user || !user.userName || !user.userEmail) {
        return res.status(400).json({ error: 'Missing registration details' });
    }

    try {
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

// Fetch events for a specific month and year
router.get('/events-by-month', async (req, res) => {
    const { month, year } = req.query;
    
    if (!month || !year) {
        return res.status(400).json({ error: 'Missing month or year parameter' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM events WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2 ORDER BY date',
            [month, year]
        );
        
        const events = result.rows.map(event => ({
            id: event.id,
            title: event.name,
            date: event.date,
            description: event.description
        }));

        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events by month:', error);
        res.status(500).json({ error: 'Failed to fetch events by month' });
    }
});

module.exports = router;
