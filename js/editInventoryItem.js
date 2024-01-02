// This file contains the code for the edit inventory item page and the fetch request to update the item in the database


// When the DOM is fully loaded (the webpage loaded in the browser) call the function to fetch the item details
document.addEventListener('DOMContentLoaded', function () {
    // Extract the item ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    // Fetch the item details and populate the form if an ID is present
    if (itemId) {
        fetchItemDetails(itemId);
    } else {
        console.error('No item ID provided');
        // Handle the error, e.g., redirect back or show an error message
    }
});

// Fetch item details based on ID and populate the edit form
async function fetchItemDetails(id) {
    try {
        // Make sure this URL matches your backend endpoint
        const response = await fetch(`http://localhost:8080/inventory/items/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const item = await response.json();
        console.log('Fetched item details:', item); // For debugging
        populateEditForm(item);
    } catch (error) {
        console.error('Fetching item details failed:', error);
    }
}

// Populate the edit form with fetched item details
function populateEditForm(item) {
    document.getElementById('editItemId').value = item.id;
    document.getElementById('editItemType').value = item.type;
    document.getElementById('editItemModel').value = item.model;
    document.getElementById('editItemExtraInformation').value = item.extraInformation;
    document.getElementById('editItemQuantity').value = item.quantity;
    document.getElementById('editItemLocation').value = item.location;
}

// Event listener for form submission
document.getElementById('editItemForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const itemId = document.getElementById('editItemId').value;
    const itemType = document.getElementById('editItemType').value;
    const itemModel = document.getElementById('editItemModel').value;
    const itemExtraInformation = document.getElementById('editItemExtraInformation').value;
    const itemQuantity = document.getElementById('editItemQuantity').value;
    const itemLocation = document.getElementById('editItemLocation').value;

    // This is the data that is sent to the server to be added to the database
    const updatedItem = {
        type: itemType,
        model: itemModel,
        extraInformation: itemExtraInformation,
        quantity: parseInt(itemQuantity, 10),
        location: itemLocation
    };

    // This is the fetch request that sends the data to the server to be added to the database
    try {
        const response = await fetch('http://localhost:8080/inventory/items/' + itemId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Item updated successfully');
        window.location.href = '../html/inventory-page.html';

    } catch (error) {
        console.error('Error updating item:', error);

    }
});
