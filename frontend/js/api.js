const API_URL = 'http://localhost:3000/api/auth';

export const fetchEvents = async () => {
    const response = await fetch(`${API_URL}/events`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return await response.json();
};

export const registerForEvent = async (eventId, userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId, ...userData }),
    });
    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
};