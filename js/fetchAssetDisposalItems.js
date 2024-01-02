// This file contains the code for fetching asset disposal items from the database and displaying them in a table.

// The URL for the backend endpoint that returns all asset disposal items
const assetDisposalUrl = 'http://localhost:8080/assetDisposal';

// When the DOM is fully loaded (the webpage loaded in the browser) call the function to fetch the asset disposal items
document.addEventListener('DOMContentLoaded', getAssetDisposalItems);

// Fetch asset disposal items from the backend endpoint and display them in a table
async function getAssetDisposalItems() {
    try {
        const response = await fetch(assetDisposalUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const assetDisposalItems = await response.json();
        displayAssetDisposalItems(assetDisposalItems);
    } catch (error) {
        console.error('Fetching asset disposal items failed:', error);

    }
}

// This function displays the asset disposal items in a table on the webpage
function displayAssetDisposalItems(items) {
    const table = document.querySelector('#assetDisposalTable tbody');
    items.forEach(item => {
        const tableRow = createTableRow(item);
        table.appendChild(tableRow);
    });
}

// This function creates a table row for each asset disposal item and populates it with the item details
function createTableRow(item) {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td>${item.id}</td>
        <td>${item.type}</td>
        <td>${item.serialNumber}</td>
        <td>${item.extraInformation}</td>
        <td>${item.disposalDate}</td>
        <td>${item.disposalReason}</td>
        <td>
            <button onclick="editItem(${item.id})">Edit</button>
            <button onclick="deleteItem(${item.id})">Delete</button>
            <button onclick="moveItem(${item.id})">Move to Disposed</button>
        </td>
    `;
    return tableRow;
}

// This function redirects the user to the add asset disposal item page when the add asset disposal item button is clicked
document.getElementById('addAssetButton').addEventListener('click', function () {
    window.location.href = '../html/add-asset-disposal-item.html';
});

// This function redirects the user to the edit asset disposal item page when the edit button is clicked
function editItem(itemId) {
    window.location.href = `edit-asset-disposal-item.html?id=${itemId}`;
}

// This function deletes an asset disposal item from the database when the delete button is clicked
function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        fetch(`http://localhost:8080/assetDisposal/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Item with ID ${id} deleted successfully.`);
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

// This function moves an asset disposal item to disposed assets when the move button is clicked
// and the user confirms.
function moveItem(id) {
    if (confirm("Are you sure you want to move this item to disposed assets?")) {
        fetch(`http://localhost:8080/assetDisposal/transfer-to-disposed/${id}`, {
            method: 'POST'
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Item with ID ${id} moved to disposed assets successfully.`);
                    location.reload();
                } else {
                    throw new Error('Item could not be moved');
                }
            })
            .catch(error => {
                console.error('Error moving item:', error);
            });
    }
}