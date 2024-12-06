// api.js

const API_URL = process.env.NODE_ENV === 'production' ? 'https://will be my-production-url.com/api/auth' : 'http://localhost:3000/api/auth';

// Fetch all events
export const fetchEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/events`);
        
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        // Return the JSON response
        return await response.json();
    } catch (error) {
        console.error('Error in fetchEvents:', error.message);
        throw error;  // Rethrow to allow further handling
    }
};

// Register user for an event
export const registerForEvent = async (eventId, userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId, ...userData }),
        });

        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        // Return the JSON response
        return await response.json();
    } catch (error) {
        console.error('Error in registerForEvent:', error.message);
        throw error;  // Rethrow to allow further handling
    }
};
