var contentLis = document.querySelectorAll(".content li");
contentLis.forEach(function (li) {
  var link = li.querySelector("a");
  if (link) {
    li.style.cursor = "pointer";
    li.onclick = function () {
      window.location.href = link.href;
    };
  }
});
