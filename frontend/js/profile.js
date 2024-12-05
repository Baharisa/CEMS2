 // frontend/js/profile.js
 const loadUserProfile = async () => {
    const userId = localStorage.getItem('userId');
    const response = await api.getUserProfile(userId);
    document.getElementById('profile-name').textContent = response.username;
};

document.addEventListener('DOMContentLoaded', loadUserProfile);