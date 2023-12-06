// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
        const response = await fetch(`http://localhost:8080/assetDisposal/${id}`);
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
    document.getElementById('editItemSerialNumber').value = item.serialNumber
    document.getElementById('editItemExtraInformation').value = item.extraInformation;
    document.getElementById('editItemDisposalDate').value = item.disposalDate;
    document.getElementById('editItemDisposalReason').value = item.disposalReason;
}

// Event listener for form submission
document.getElementById('editItemForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const itemId = document.getElementById('editItemId').value;
    const itemType = document.getElementById('editItemType').value;
    const itemSerialNumber = document.getElementById('editItemSerialNumber').value;
    const itemExtraInformation = document.getElementById('editItemExtraInformation').value;
    const itemDisposalDate = document.getElementById('editItemDisposalDate').value;
    const itemDisposalReason = document.getElementById('editItemDisposalReason').value;

    const updatedItem = {
        type: itemType,
        serialNumber: itemSerialNumber,
        extraInformation: itemExtraInformation,
        disposalDate: itemDisposalDate,
        disposalReason: itemDisposalReason
    };

    try {
        const response = await fetch('http://localhost:8080/assetDisposal/' + itemId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Asset updated successfully');
        window.location.href = '../html/asset-disposal.html';

    } catch (error) {
        console.error('Error updating asset:', error);

    }
});