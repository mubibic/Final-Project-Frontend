// Replace with your API endpoint
const apiEndpoint = 'http://localhost:8080/login';

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            alert("Wrong username or password!");
        }

        const data = await response.json();
        console.log(data);

        // Store user data in session storage
        if (data !== null) {
            alert('Login successful: ' + data.username);
            sessionStorage.setItem('HMS_isLoggedIn', 'true'); // Set session storage
            sessionStorage.setItem('HMS_username', data.username);
            window.location.href = '../html/main-page.html';
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Show error message to user
    }
});