// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        // Add active class to clicked item
        item.classList.add('active');
    });
});

// Profile dropdown functionality (can be expanded)
const profile = document.querySelector('.profile');
profile.addEventListener('click', () => {
    // Add dropdown menu functionality here
    console.log('Profile clicked');
});

// Notification button functionality (can be expanded)
const notificationBtn = document.querySelector('.notification-btn');
notificationBtn.addEventListener('click', () => {
    // Add notifications functionality here
    console.log('Notifications clicked');
});

// Search functionality (can be expanded)
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    // Add search functionality here
    console.log('Search:', e.target.value);
});