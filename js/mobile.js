(function () {
  const initMobileNav = () => {
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("nav ul");

    if (hamburger && navUl) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navUl.classList.toggle("active");
        const isExpanded = hamburger.classList.contains("active");
        hamburger.setAttribute("aria-expanded", isExpanded);
      });

      document.addEventListener("click", (event) => {
        if (!event.target.closest("nav") && hamburger.classList.contains("active")) {
          hamburger.classList.remove("active");
          navUl.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
        }
      });

      navUl.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navUl.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
        });
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNav);
  } else {
    initMobileNav();
  }
})();
