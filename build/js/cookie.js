
const cookieBanner = document.getElementById('cookie-banner');
const acceptButton = document.getElementById('accept-cookies');

// Check if cookie exists to avoid showing banner on every visit
const cookieName = 'cookie-consent';
if (!localStorage.getItem(cookieName)) {
    cookieBanner.classList.add("active");
}

// Handle "Accept" button click
acceptButton.addEventListener('click', () => {
    // Set a cookie to remember user consent
    localStorage.setItem(cookieName, true);
    // Hide the banner
    cookieBanner.classList.remove("active");
});