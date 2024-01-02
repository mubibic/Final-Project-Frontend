// This file contains the login logic

// The URL for the backend endpoint that returns all disposed asset items
const apiEndpoint = 'http://localhost:8080/login';

// This is the fetch request to get the disposed asset items from the database and display them in a table
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // This part of the fetch request sends the data to the server to be added to the database
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        });

        // This checks if the username and password are correct and displays an error message if they are not
        if (!response.ok) {
            alert("Wrong username or password!");
        }
        // This is the response from the server after the data has been added to the database
        const data = await response.json();
        console.log(data);

        // This stores user details in session storage and redirects to the main page
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