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
    `;
    return tableRow;
}