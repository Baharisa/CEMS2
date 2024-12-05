 // frontend/js/feedback.js
 import api from './api.js';

 const submitFeedback = async (event) => {
     event.preventDefault();
     const feedbackData = {
         userId: document.getElementById('user-id').value,
         content: document.getElementById('feedback-content').value,
     };
 
     const response = await api.submitFeedback(feedbackData);
     alert('Feedback submitted successfully!');
 };
 
 document.getElementById('feedback-form').addEventListener('submit', submitFeedback);