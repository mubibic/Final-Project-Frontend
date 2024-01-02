// This file is the navbar that is displayed on all pages of the website


// This checks if the user is logged in and redirects to login page if not
if (sessionStorage.getItem('HMS_isLoggedIn') !== 'true') {
    window.location.href = '../html/login.html';
}

// This function sets up the authentication status and logout functionality
window.onload = function () {
    const authStatus = document.getElementById('authStatus');
    const logoutButton = document.getElementById('logoutButton');
    // This listenes for logout button
    logoutButton.addEventListener('click', function () {
        sessionStorage.clear();
        location.reload();
    });

    // This displays the username in the navbar if the user is logged in
    const username = sessionStorage.getItem('HMS_username');
    if (username) {
        authStatus.innerHTML = 'Logged in as: [  ' + username + '  ]';
        logoutButton.innerHTML = 'Logout';
    }
}

// This toggles the menu visibility on mobile
const menuToggle = document.querySelector('.menu-toggle');
const bxMenu = document.querySelector('.bx-menu');
const bxX = document.querySelector('.bx-x');

const navBar = document.querySelector('.navbar');

// This shows the menu when the menu button is clicked on mobile
bxMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('bx-menu')) {
        navBar.classList.add('show-navbar');
        bxMenu.classList.add('hide-bx');
        bxX.classList.add('show-bx');
    }
})

// This hides the menu when the x button is clicked on mobile
bxX.addEventListener('click', (e) => {
    if (e.target.classList.contains('bx-x')) {
        navBar.classList.remove('show-navbar');
        bxMenu.classList.remove('hide-bx');
        bxX.classList.remove('show-bx');
    }
})