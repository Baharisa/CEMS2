const express = require('express'); 
const cors = require('cors'); // Import CORS middleware
const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use(cors());  // Allow requests from other origins (frontend)

// API routes
const eventRoutes = require('./routes/eventRoutes');  // Event-related routes
app.use('/api/events', eventRoutes);  // Attach the eventRoutes to '/api/events'

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
