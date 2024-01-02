// This file contains the code for adding an asset disposal item to the database and
// redirecting to the asset disposal page after the item has been added

// This is the fetch request that sends the data to the server to be added to the database
// using async function which is a promise that the data will be sent to the server
// and await which waits for the promise to be fulfilled or rejected
document.getElementById('addAssetForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // This is the data that is sent to the server to be added to the database
    const assetData = {
        type: document.getElementById('type').value,
        serialNumber: document.getElementById('serialNumber').value,
        extraInformation: document.getElementById('extraInformation').value,
        disposalDate: document.getElementById('disposalDate').value,
        disposalReason: document.getElementById('disposalReason').value,
    };

    // This is the fetch request that sends the data to the server to be added to the database
    try {
        const response = await fetch('http://localhost:8080/assetDisposal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assetData)
        });

        // This is the response from the server after the data has been added to the database and redirects to the asset disposal page
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Asset Added:', result);
        window.location.href = '../html/asset-disposal.html';
    } catch (error) {
        console.error('Error adding asset:', error);
    }
});