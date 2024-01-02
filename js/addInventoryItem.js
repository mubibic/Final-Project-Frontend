// This file contains the code for the add inventory item page and the fetch request to add the item to the database

// This is the fetch request that sends the data to the server to be added to the database
// using async function which is a promise that the data will be sent to the server
// and await which waits for the promise to be fulfilled or rejected
document.getElementById('addAssetForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // This is the data that is sent to the server to be added to the database
    const assetData = {
        type: document.getElementById('type').value,
        model: document.getElementById('model').value,
        extraInformation: document.getElementById('extraInformation').value,
        quantity: parseInt(document.getElementById('quantity').value, 10),
        location: document.getElementById('location').value

    };

    // This is the fetch request that sends the data to the server to be added to the database and checks if the item already exists
    try {
        const response = await fetch('http://localhost:8080/inventory/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assetData)
        });

        // This is the response from the server after the data has been added to the database and redirects to the inventory page
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // This is the response from the server after the data has been added to the database
        const result = await response.json();
        alert("Item added: Type: " + result.type + ", Model: " + result.model + ", Total quantity: " + result.quantity + ", Location: " + result.location);

        // Checking if item already exists in inventory - the message is not always correct as it appears even if the item is just been added
        /*  const response2 = await fetch(`http://localhost:8080/inventory/items/${result.id}`);
          const existingItem = await response2.json();

          if(existingItem){
              alert("Item already exists, quantity updated");
          }*/

        window.location.href = '../html/inventory-page.html';
    } catch (error) {
        console.error('Error adding asset:', error);
    }
});