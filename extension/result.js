
    // Display the result on the page
    const result = JSON.parse(localStorage.getItem('apiResult'));

    // Display the result on the page
    document.getElementById('result').textContent = result.prediction;