// backend/config/db.js
const { Pool } = require('pg'); 
require('dotenv').config(); // Load environment variables from .env file

// Create a pool instance for PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,           // Database user (from .env)
    host: process.env.DB_HOST,           // Database host (from .env)
    database: process.env.DB_NAME,       // Database name (make sure it matches your .env file)
    password: process.env.DB_PASSWORD,   // Database password (from .env)
    port: process.env.DB_PORT,           // Database port (from .env)
});

// Test database connection and log any error
pool.connect()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err.message);
    });

module.exports = pool; // Export the pool for use in other files
