window.onload = function () {
   if (!localStorage.getItem('popupClosed')) {
      var p = document.getElementById('popup');
      if (p) p.style.display = 'flex';
   }
};

function closePopup() {
   var p = document.getElementById('popup');
   if (p) p.style.display = 'none';
   try {
      localStorage.setItem('popupClosed', 'true');
   } catch (e) {}
}