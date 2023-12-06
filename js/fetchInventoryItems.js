const inventoryUrl = 'http://localhost:8080/inventory/items';

document.addEventListener('DOMContentLoaded', getInventoryItems);

async function getInventoryItems() {
    try {
        const response = await fetch(inventoryUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const inventoryItems = await response.json();
        displayInventoryItems(inventoryItems);
    } catch (error) {
        console.error('Fetching inventory items failed:', error);
        // Handle the error gracefully in UI
    }
}

function displayInventoryItems(items) {
    const table = document.querySelector('#inventoryTable tbody');
    items.forEach(item => {
        const tableRow = createTableRow(item);
        table.appendChild(tableRow);
    });
}

function createTableRow(item) {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td>${item.id}</td>
        <td>${item.type}</td>
        <td>${item.model}</td>
        <td>${item.extraInformation}</td>
        <td>${item.quantity}</td>
        <td>${item.location}</td>
        <td>
            <button onclick="editItem(${item.id})">Edit</button>
            <button onclick="deleteItem(${item.id})">Delete</button>
        </td>
    `;
    return tableRow;
}

document.getElementById('addInventoryButton').addEventListener('click', function() {
    window.location.href = '../html/add-inventory-item.html';
});


function editItem(itemId) {
    window.location.href = `edit-inventory-item.html?id=${itemId}`;
}

function deleteItem(id) {
    if(confirm("Are you sure you want to delete this item?")) {
        fetch(`http://localhost:8080/inventory/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if(response.ok) {
                    console.log(`Item with ID ${id} deleted successfully.`);
                    // Reload the current page to reflect the deletion
                    location.reload();
                } else {
                    throw new Error('Item could not be deleted');
                }
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    }
}

document.getElementById('filterButton').addEventListener('click', function() {
    const type = document.getElementById('filterType').value;
    const model = document.getElementById('filterModel').value;
    const extraInformation = document.getElementById('filterExtraInformation').value;
    const location = document.getElementById('filterLocation').value;
    fetchFilteredItems(type, model, extraInformation, location);
});

function fetchFilteredItems(type, model, extraInformation, location) {
    const query = new URLSearchParams({
        type: type,
        model: model,
        extraInformation: extraInformation,
        location: location
    }).toString();

    fetch(`http://localhost:8080/inventory/items/filter?${query}`)
        .then(response => response.json())
        .then(items => {
            // Clear existing items and process response as before
            // ...

            const tableBody = document.querySelector('#inventoryTable tbody');
            tableBody.innerHTML = '';

            let totalQuantity = 0;
            items.forEach(item => {
                tableBody.appendChild(createTableRow(item));
                totalQuantity += item.quantity; // Assuming 'quantity' is a property of your item
            });

            // Update total quantity display
            document.getElementById('totalQuantityDisplay').innerText = `Total Quantity: ${totalQuantity}`;
        })
        .catch(error => console.error('Error fetching filtered items:', error));
}
