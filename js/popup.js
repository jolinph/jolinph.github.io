window.onload = function () {
   var p = document.getElementById('popup');
   if (p) p.style.display = 'flex';
};

function closePopup() {
   var p = document.getElementById('popup');
   if (p) p.style.display = 'none';
}