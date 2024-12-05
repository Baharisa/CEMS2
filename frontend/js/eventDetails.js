// Get the event ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

// DOM elements
const eventTitle = document.getElementById('event-title');
const eventDate = document.getElementById('event-date');
const eventLocation = document.getElementById('event-location');
const eventDescription = document.getElementById('event-description');
const eventCapacity = document.getElementById('event-capacity');
const eventAccessRestriction = document.getElementById('event-access-restriction');
const eventTargetAudience = document.getElementById('event-target-audience');
const errorMessage = document.getElementById('error-message');

// Fetch event details from the API
async function fetchEventDetails() {
    try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        if (!response.ok) {
            if (response.status === 404) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Event not found.';
            }
            throw new Error(`Failed to fetch event: ${response.status}`);
        }
        const event = await response.json();

        // Update the DOM with event details
        eventTitle.textContent = event.title;
        eventDate.textContent = `Date: ${new Date(event.date).toLocaleString()}`;
        eventLocation.textContent = `Location: ${event.location}`;
        eventDescription.textContent = `Description: ${event.description}`;
        eventCapacity.textContent = `Capacity: ${event.capacity}`;
        eventAccessRestriction.textContent = `Access: ${event.access_restriction}`;
        eventTargetAudience.textContent = `Target Audience: ${event.target_audience}`;
    } catch (error) {
        console.error('Error fetching event details:', error);
    }
}

// Call the function when the page loads
fetchEventDetails();
