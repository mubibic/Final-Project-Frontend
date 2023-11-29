document.getElementById('addAssetForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const assetData = {
        type: document.getElementById('type').value,
        model: document.getElementById('model').value,
        extraInformation: document.getElementById('extraInformation').value,
        quantity: parseInt(document.getElementById('quantity').value, 10),
        location: document.getElementById('location').value

    };

    try {
        const response = await fetch('http://localhost:8080/inventory/items', {
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
        window.location.href = '../html/inventory-page.html';
    } catch (error) {
        console.error('Error adding asset:', error);
    }
});