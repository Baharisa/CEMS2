const API_BASE = 'http://localhost:3000/api/dashboard';

async function loadDashboardData() {
    try {
        // Fetch event statistics
        const statsResponse = await fetch(`${API_BASE}/stats`);
        if (!statsResponse.ok) throw new Error('Failed to fetch stats');
        const stats = await statsResponse.json();

        document.getElementById('total-events').textContent = stats.totalEvents || 0;
        document.getElementById('upcoming-events').textContent = stats.upcomingEvents || 0;
        document.getElementById('past-events').textContent = stats.pastEvents || 0;
        document.getElementById('total-registrations').textContent = stats.totalRegistrations || 0;

        // Fetch recent activities
        const activitiesResponse = await fetch(`${API_BASE}/activities`);
        if (!activitiesResponse.ok) throw new Error('Failed to fetch activities');
        const activities = await activitiesResponse.json();

        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = activities.map(activity => `<li>${activity}</li>`).join('');
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}
