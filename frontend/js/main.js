import { fetchEvents, registerForEvent } from './api.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application initialized');

    // Example: Fetch and display all events on a specific page
    if (document.getElementById('events-list')) {
        fetchAndDisplayEvents();
    }
});

// Function to fetch and display events
async function fetchAndDisplayEvents() {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '<p>Loading events...</p>';

    try {
        const events = await fetchEvents();
        if (events.length === 0) {
            eventsList.innerHTML = '<p>No events available.</p>';
        } else {
            eventsList.innerHTML = events.map(event => `
                <div class="event">
                    <h2>${event.title}</h2>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p>${event.description}</p>
                    <button onclick="openRegistrationForm('${event.id}', '${event.title}')">RSVP Now</button>
                </div>
            `).join('');
        }
    } catch (error) {
        eventsList.innerHTML = '<p>Error loading events.</p>';
        console.error('Error:', error);
    }
}

// Function to open registration form
function openRegistrationForm(eventId, eventTitle) {
    const formHtml = `
        <div id="registration-form">
            <h3>Register for ${eventTitle}</h3>
            <input type="text" id="user-name" placeholder="Your Name" required>
            <input type="email" id="user-email" placeholder="Your Email" required>
            <button onclick="registerForEventHandler('${eventId}')">Register</button>
            <button onclick="closeRegistrationForm()">Cancel</button>
        </div>
    `;
    document.getElementById('events-list').innerHTML += formHtml;
}

// Function to handle event registration
async function registerForEventHandler(eventId) {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const messageDiv = document.createElement('div'); // Create a message div
    document.getElementById('events-list').appendChild(messageDiv); // Append message div to events list

    try {
        const response = await registerForEvent(eventId, { userName: name, userEmail: email });
        console.log('Registration Response:', response);
        messageDiv.textContent = 'Registration successful!';
        // Optionally, you could refresh the events list or close the form here
    } catch (error) {
        console.error('Error registering:', error);
        messageDiv.textContent = 'Failed to register. Please try again.';
    }
}

// Function to close registration form
function closeRegistrationForm() {
    const form = document.getElementById('registration-form');
    if (form) {
        form.remove(); // Remove the form from the DOM
    }
}