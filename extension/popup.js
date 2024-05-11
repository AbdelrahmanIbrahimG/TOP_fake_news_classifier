document.getElementById('check').addEventListener('click', function() {

    var selectedText = window.getSelection().toString();

    const url = 'https://top9.p.rapidapi.com/classify';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'e6332296a5msh157cb1e6e200cfdp145336jsn914f220362a4',
            'X-RapidAPI-Host': 'top9.p.rapidapi.com'
        },
        body: JSON.stringify({"text": selectedText})
    };

    (async () => {  
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            document.getElementById('result').textContent = result.prediction;
        } catch (error) {
            console.error(error);
        }
    })();
});

document.addEventListener('mouseup', function() {
    var selectedText = window.getSelection().toString().trim();
    var popupButton = document.getElementById('popupButton');

    if (selectedText !== '') {
        popupButton.style.display = 'block';
        var selection = window.getSelection().getRangeAt(0);
        var rect = selection.getBoundingClientRect();
        popupButton.style.top = rect.top - popupButton.offsetHeight - 10 + 'px';
        popupButton.style.left = rect.left + (rect.width / 2) - (popupButton.offsetWidth / 2) + 'px';
    } else {
        popupButton.style.display = 'none';
    }
})


      // const url = 'https://top9.p.rapidapi.com/';
      // const options = {
      //   method: 'GET',
      //   headers: {
      //     'X-RapidAPI-Key': 'e6332296a5msh157cb1e6e200cfdp145336jsn914f220362a4',
      //     'X-RapidAPI-Host': 'top9.p.rapidapi.com'
      //   }
      // };

      // (async () => {  
      //   try {
      //     const response = await fetch(url, options);
      //     const result = await response.text();
      //     console.log(result);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // })();