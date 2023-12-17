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


document.getElementById('filterButton').addEventListener('click', function() {
    const type = document.getElementById('filterType').value;
    const serialNumber = document.getElementById('filterSerialNumber').value;
    const extraInformation = document.getElementById('filterExtraInformation').value;
    const disposalDate = document.getElementById('filterDisposalDate').value;
    const disposalReason = document.getElementById('filterDisposalReason').value;
    fetchFilteredItems(type, serialNumber, extraInformation, disposalDate, disposalReason);
});

function fetchFilteredItems(type, serialNumber, extraInformation, disposalDate, disposalReason) {
    const query = new URLSearchParams({
        type: type,
        serialNumber: serialNumber,
        extraInformation: extraInformation,
        disposalDate: disposalDate,
        disposalReason: disposalReason
    }).toString();

    fetch(`http://localhost:8080/disposed-items/items/filter?${query}`)
        .then(response => response.json())
        .then(items => {
            // Clear existing items and process response as before
            // ...

            const tableBody = document.querySelector('#disposedAssetItemsTable tbody');
            tableBody.innerHTML = '';

            //showing total quantity
            let totalQuantity = 0;
            items.forEach(item => {
                tableBody.appendChild(createTableRow(item));
                totalQuantity += 1; // Increment for each item
            });

            // Update total quantity display
            document.getElementById('totalQuantityDisplay').innerText = `Total Quantity: ${totalQuantity}`;
        })
        .catch(error => console.error('Error fetching filtered items:', error));
}

// ...

//Print Report function
document.getElementById('printReportButton').addEventListener('click', function() {
    exportToExcel();
});

function exportToExcel() {
    const itemsTable = document.querySelector('#disposedAssetItemsTable');
    const items = Array.from(itemsTable.querySelectorAll('tbody tr')).map(row => {
        const cells = Array.from(row.querySelectorAll('td')).slice(0, -1);
        return cells.map(cell => cell.innerText);
    });

    const ws = XLSX.utils.aoa_to_sheet([['ID', 'Type', 'Serial Number', 'Extra Information', 'Disposal Date', 'Disposal Reason']].concat(items));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DisposedItemsReport');

    // Save the Excel file
    XLSX.writeFile(wb, 'DisposedItemsReport.xlsx');
}
// ...
