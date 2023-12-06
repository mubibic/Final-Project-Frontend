document.getElementById('addAssetForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const assetData = {
        type: document.getElementById('type').value,
        extraInformation: document.getElementById('extraInformation').value,
        disposalDate: document.getElementById('disposalDate').value,
        disposalReason: document.getElementById('disposalReason').value,
    };

    try {
        const response = await fetch('http://localhost:8080/assetDisposal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assetData)
        });

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