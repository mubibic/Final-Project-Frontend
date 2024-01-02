// This file contains the logic for fetching disposed asset items from the server and displaying them in a table.

// The URL for the backend endpoint that returns all disposed asset items
const disposedAssetItemsUrl = 'http://localhost:8080/disposed-items';

// When the DOM is fully loaded (the webpage loaded in the browser) call the function to fetch the disposed asset items
document.addEventListener('DOMContentLoaded', getDisposedAssetItems);

// This is the fetch request to get the disposed asset items from the database and display them in a table
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

// This function displays the disposed asset items in a table on the webpage
function displayDisposedAssetItems(items) {
    const table = document.querySelector('#disposedAssetItemsTable tbody');
    items.forEach(item => {
        const tableRow = createTableRow(item);
        table.appendChild(tableRow);
    });
}

// This function creates a table row for each disposed asset item and populates it with the item details
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

// This function redirects the user to the add disposed asset item page when the add disposed asset item button is clicked
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

// document is the DOM object representing the webpage and addEventListener is listening for the click event on the addAssetButton
document.getElementById('filterButton').addEventListener('click', function () {
    const type = document.getElementById('filterType').value;
    const serialNumber = document.getElementById('filterSerialNumber').value;
    const extraInformation = document.getElementById('filterExtraInformation').value;
    const disposalDate = document.getElementById('filterDisposalDate').value;
    const disposalReason = document.getElementById('filterDisposalReason').value;
    fetchFilteredItems(type, serialNumber, extraInformation, disposalDate, disposalReason);
});

// This function fetches the filtered items from the database and displays them in a table
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

            // This variable will be used to calculate the total quantity of items
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

// Print Report function
document.getElementById('printReportButton').addEventListener('click', function () {
    exportToExcel();
});

// This function exports the disposed asset items to an Excel file and downloads it to the user's local disk
function exportToExcel() {
    const itemsTable = document.querySelector('#disposedAssetItemsTable');
    const items = Array.from(itemsTable.querySelectorAll('tbody tr')).map(row => {
        const cells = Array.from(row.querySelectorAll('td')).slice(0, -1);
        return cells.map(cell => cell.innerText);
    });

    // Add the header row
    const ws = XLSX.utils.aoa_to_sheet([['ID', 'Type', 'Serial Number', 'Extra Information', 'Disposal Date', 'Disposal Reason']].concat(items));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DisposedItemsReport');

    // Save the Excel file
    XLSX.writeFile(wb, 'DisposedItemsReport.xlsx');
}