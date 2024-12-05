const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db'); // Import the database connection
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Load environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Test DB connection
pool.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error("Error connecting to the database:", err));

// Define root route
app.get('/', (req, res) => {
    res.send('Welcome to the CEMS application!');
});

// API routes
app.use('/api/auth', authRoutes);       // Authentication routes
app.use('/api/events', eventRoutes);     // Event-related routes
app.use('/api/dashboard', dashboardRoutes); // Dashboard-related routes
app.use('/api/users', userRoutes);       // User management routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});