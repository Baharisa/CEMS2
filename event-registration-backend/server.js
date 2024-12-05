const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Sample event data
const events = [
    { id: "1", title: "Campus Fair", date: "2024-05-01", description: "Join us for the annual campus fair!" },
    { id: "2", title: "Guest Lecture Series", date: "2024-05-15", description: "A series of lectures by industry experts." },
    { id: "3", title: "Sports Day", date: "2024-06-10", description: "Participate in various sports activities." },
    { id: "4", title: "Coding Bootcamp", date: "2024-05-20", description: "An intensive coding bootcamp for beginners." }
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to get events for a specific month and year
app.get('/api/events', (req, res) => {
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);
    
    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() + 1 === month && eventDate.getFullYear() === year;
    });

    res.json(filteredEvents);
});

// Endpoint to get details of a specific event
app.get('/api/events/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
});

// Endpoint to register for an event
app.post('/api/events/register', (req, res) => {
    const { eventId, userName, userEmail } = req.body;

    // Validate input
    if (!eventId || !userName || !userEmail) {
        return res.status(400).json({ error: "All fields are required: eventId, userName, userEmail" });
    }

    // save the registration in a database
    console.log(`User ${userName} registered for event ${eventId} with email ${userEmail}`);
    
    // Respond with a success message
    res.status(200).json({ message: 'Registration successful!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});