
// --- check if user is logged in ---
if (sessionStorage.getItem('HMS_isLoggedIn') !== 'true') {
    window.location.href = '../html/login.html';
}

// AUTHENTICATION
window.onload = function() {
    const authStatus = document.getElementById('authStatus');
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        sessionStorage.clear();
        location.reload();
    });

    const username = sessionStorage.getItem('HMS_username');
    if (username) {
        authStatus.innerHTML = 'Logged in as: [  ' + username + '  ]';
        logoutButton.innerHTML = 'Logout';
    }
}




const menuToggle = document.querySelector('.menu-toggle');
const bxMenu = document.querySelector('.bx-menu');
const bxX = document.querySelector('.bx-x');

const navBar = document.querySelector('.navbar');

// --- open menu ---

bxMenu.addEventListener('click', (e)=> {
    if(e.target.classList.contains('bx-menu')){
        navBar.classList.add('show-navbar');
        bxMenu.classList.add('hide-bx');
        bxX.classList.add('show-bx');
    }
})

// --- close menu ---

bxX.addEventListener('click', (e)=> {
    if(e.target.classList.contains('bx-x')){
        navBar.classList.remove('show-navbar');
        bxMenu.classList.remove('hide-bx');
        bxX.classList.remove('show-bx');
    }
})