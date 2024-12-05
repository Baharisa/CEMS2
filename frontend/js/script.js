const apiBaseUrl = 'http://localhost:3000/api/v1'; // Base URL for the backend API

// Fetch events from the backend API
async function fetchEvents() {
    try {
        const response = await fetch(`${apiBaseUrl}/events`);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

// Display fetched events on the Event Listing page
async function displayEvents() {
    const eventsListContainer = document.getElementById('events-list'); // Container to display events

    if (!eventsListContainer) {
        console.error('Element with ID "events-list" not found.');
        return;
    }

    eventsListContainer.innerHTML = '<p>Loading events...</p>'; // Temporary loading message

    try {
        const events = await fetchEvents();
        if (events.length === 0) {
            eventsListContainer.innerHTML = '<p>No events found.</p>'; // Show message if no events are available
            return;
        }

        eventsListContainer.innerHTML = ''; // Clear the container
        events.forEach(event => {
            const eventCard = `
                <div class="event">
                    <h2>${event.title}</h2>
                    <img src="${event.image || './images/placeholder.png'}" alt="${event.title || 'Event Image'}" />
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <button onclick="registerForEvent('${event.id}')" aria-label="Register for ${event.title}">RSVP Now</button>
                </div>
            `;
            eventsListContainer.innerHTML += eventCard;
        });
    } catch (error) {
        console.error('Error displaying events:', error);
        eventsListContainer.innerHTML = '<p>Error loading events. Please try again later.</p>';
    }
}

// Register for an event (example functionality)
async function registerForEvent(eventId) {
    try {
        const userId = getCurrentUserId();
        if (!userId) {
            alert('You need to log in to register for events.');
            window.location.href = './login.html';
            return;
        }

        const response = await fetch(`${apiBaseUrl}/events/${eventId}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` // Add token for authentication
            },
            body: JSON.stringify({ userId })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        const result = await response.json();
        alert(`Successfully registered for event: ${result.title}`);
    } catch (error) {
        console.error('Error registering for event:', error);
        alert('Failed to register for the event. Please try again.');
    }
}

// Get the current user's ID from the JWT token
function getCurrentUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.id; // Assumes the token contains a user ID
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}

// Call `displayEvents` when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayEvents();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Handle login functionality
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('token', result.token);
            window.location.href = './events.html'; // Redirect to events page after successful login
        } else {
            alert(result.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
}
