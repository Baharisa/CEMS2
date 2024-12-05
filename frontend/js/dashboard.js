// JavaScript to fetch data from the backend and update the dashboard dynamically
async function loadDashboardData() {
    try {
        // Fetch statistics for the dashboard
        const statsResponse = await fetch('/api/dashboard/statistics');
        const activitiesResponse = await fetch('/api/dashboard/recent-activities');

        const statsData = await statsResponse.json();
        const activitiesData = await activitiesResponse.json();

        // Update the statistics on the dashboard
        document.getElementById('total-events').textContent = statsData.totalEvents;
        document.getElementById('upcoming-events').textContent = statsData.upcomingEvents;
        document.getElementById('past-events').textContent = statsData.pastEvents;
        document.getElementById('total-registrations').textContent = statsData.totalRegistrations;

        // Update recent activities
        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = ''; // Clear existing list
        if (activitiesData.recentActivities.length > 0) {
            activitiesData.recentActivities.forEach(activity => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${activity.user_name}</strong> performed action "<span class="action">${activity.action}</span>" on <span class="date">${new Date(activity.created_at).toLocaleString()}</span>`;
                activityList.appendChild(li);
            });
        } else {
            activityList.innerHTML = '<li>No recent activities</li>';
        }

        // Create a pie chart for event statistics
        const ctx = document.getElementById('eventChart').getContext('2d');
        const eventChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Upcoming Events', 'Past Events'],
                datasets: [{
                    label: 'Event Distribution',
                    data: [statsData.upcomingEvents, statsData.pastEvents],
                    backgroundColor: ['#ff5722', '#1a73e8'],
                    borderColor: ['#fff', '#fff'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + ' events';
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Load data when the page is loaded
document.addEventListener('DOMContentLoaded', loadDashboardData);

// Attach the "Refresh Data" button event listener
const refreshButton = document.getElementById('refreshButton');
if (refreshButton) {
    refreshButton.addEventListener('click', loadDashboardData);
}
