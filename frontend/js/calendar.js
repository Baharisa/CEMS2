 // frontend/js/calendar.js
 import api from './api.js';

 const loadEvents = async () => {
     const events = await api.getEvents();
     const calendarContainer = document.getElementById('calendar-events');
     calendarContainer.innerHTML = '';
 
     events.forEach(event => {
         const eventElement = document.createElement('div');
         eventElement.className = 'event-item';
         eventElement.innerHTML = `<h3>${event.title}</h3><p>${event.date}</p>`;
         calendarContainer.appendChild(eventElement);
     });
 };
 
 document.addEventListener('DOMContentLoaded', loadEvents);