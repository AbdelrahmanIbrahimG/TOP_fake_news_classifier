// document.getElementById('body').addEventListener('mouseup', function() {
//     var selectedText = window.getSelection().toString().trim();
//     var popupButton = document.getElementById('popupButton');

//     if (selectedText !== '') {
//         popupButton.style.display = 'block';
//         var selection = window.getSelection().getRangeAt(0);
//         var rect = selection.getBoundingClientRect();
//         popupButton.style.top = rect.top - popupButton.offsetHeight - 10 + 'px';
//         popupButton.style.left = rect.left + (rect.width / 2) - (popupButton.offsetWidth / 2) + 'px';
//     } else {
//         popupButton.style.display = 'none';
//     }
// })