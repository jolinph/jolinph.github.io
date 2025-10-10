document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".container li");
  cards.forEach((card) => {
    const link = card.querySelector("a");
    if (link) {
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        if (e.target.tagName !== "A") {
          if (e.ctrlKey || e.metaKey) {
            window.open(link.href, "_blank");
          } else {
            window.location.href = link.href;
          }
        }
      });
    }
  });
});
