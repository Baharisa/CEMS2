import api from './api.js';  // Importing API methods

const loadEvents = async () => {
    try {
        const events = await api.getEvents();  // Fetch events from the backend API
        const calendarBody = document.getElementById('calendar-body');  // Assuming this is the tbody in your calendar table

        // Clear any existing events
        calendarBody.innerHTML = '';

        // Get the first day of the month and total days in the month
        const currentDate = new Date();  // Current date to calculate the month and year
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();  // Get the first day of the month
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();  // Get the total days in the month
        let days = [];
        
        // Add empty cells for the days before the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push('<td></td>');
        }
        
        // Now, fill in the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            // Find any events that occur on this day
            const event = events.find(event => new Date(event.date).getDate() === day);
            const eventClass = event ? 'event' : '';

            // Create the calendar day cell with event info if applicable
            days.push(`
                <td class="${eventClass}" data-event-id="${event ? event.id : ''}" 
                    onmouseover="showTooltip(event, ${day})" onmouseout="hideTooltip()"
                    onclick="showEventDetails(${event ? event.id : ''})">
                    ${day}
                    ${event ? `<div class="event-indicator">${event.title}</div>` : ''}
                </td>
            `);

            // Start a new row every 7 days (week row)
            if ((firstDayOfMonth + day) % 7 === 0) {
                calendarBody.innerHTML += `<tr>${days.join('')}</tr>`;
                days = [];
            }
        }
        
        // Add any remaining days
        if (days.length > 0) {
            calendarBody.innerHTML += `<tr>${days.join('')}</tr>`;
        }
    } catch (error) {
        console.error('Error loading events:', error);
    }
};

// Show event details when a day with an event is clicked
const showEventDetails = (eventId) => {
    if (!eventId) return;

    // Redirect to event details page or show a modal with event details
    window.location.href = `/events/${eventId}`;  // Example redirection to event details page
};

// Show tooltip with event details
const tooltip = document.createElement('div');
tooltip.classList.add('event-tooltip');
document.body.appendChild(tooltip);

const showTooltip = (event, day) => {
    const eventId = event.target.getAttribute('data-event-id');
    if (eventId) {
        api.getEventDetails(eventId)
            .then(eventDetails => {
                tooltip.classList.add('show');
                tooltip.innerHTML = `
                    <strong>${eventDetails.title}</strong><br>
                    ${eventDetails.description}
                `;
                tooltip.style.top = `${event.clientY + 10}px`;
                tooltip.style.left = `${event.clientX + 10}px`;
            })
            .catch(error => {
                console.error('Error fetching event details:', error);
            });
    }
};

// Hide tooltip
const hideTooltip = () => {
    tooltip.classList.remove('show');
};

// Initialize events on page load
document.addEventListener('DOMContentLoaded', loadEvents);
