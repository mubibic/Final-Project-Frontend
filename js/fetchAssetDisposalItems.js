const assetDisposalUrl = 'http://localhost:8080/assetDisposal';

document.addEventListener('DOMContentLoaded', getAssetDisposalItems);

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

function displayAssetDisposalItems(items) {
    const table = document.querySelector('#assetDisposalTable tbody');
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

document.getElementById('addAssetButton').addEventListener('click', function() {
    window.location.href = '../html/add-asset-disposal-item.html';
});


function editItem(itemId) {
    window.location.href = `edit-asset-disposal-item.html?id=${itemId}`;
}

function deleteItem(id) {
    if(confirm("Are you sure you want to delete this item?")) {
        fetch(`http://localhost:8080/assetDisposal/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if(response.ok) {
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

function moveItem(id) {
    if(confirm("Are you sure you want to move this item to disposed assets?")) {
        fetch(`http://localhost:8080/asset-management/transfer-to-disposed/${id}`, {
            method: 'POST'
        })
            .then(response => {
                if(response.ok) {
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