// Replace with your API endpoint
const apiEndpoint = 'http://localhost:8080/login';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            console.log('Login successful:', data);
            window.location.href = '../html/main-page.html';
        })
        .catch(error => {
            console.error('Error during login:', error);
            // Show error message to user
        });
});