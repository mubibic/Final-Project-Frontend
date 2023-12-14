const disposedAssetItemsUrl = 'http://localhost:8080/disposed-items';

document.addEventListener('DOMContentLoaded', getDisposedAssetItems);

async function getDisposedAssetItems() {
    try {
        const response = await fetch(disposedAssetItemsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const disposedAssetItems = await response.json();
        displayDisposedAssetItems(disposedAssetItems);
    } catch (error) {
        console.error('Fetching disposed asset items failed:', error);

    }
}

function displayDisposedAssetItems(items) {
    const table = document.querySelector('#disposedAssetItemsTable tbody');
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
            <button onclick="moveBackItem(${item.id})">Move Back</button>
        </td>
    `;
    return tableRow;
}

function moveBackItem(id) {
    if (confirm("Are you sure you want to move this item back to the asset disposal table?")) {
        fetch(`http://localhost:8080/disposed-items/transfer-back-from-disposed/${id}`, {
            method: 'POST'
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Item with ID ${id} moved back successfully.`);
                    location.reload();
                } else {
                    throw new Error('Item could not be moved back');
                }
            })
            .catch(error => {
                console.error('Error moving item back:', error);
            });
    }
}