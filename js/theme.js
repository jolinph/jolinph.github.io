(function () {
  const THEME_KEY = "site-theme";
  const THEMES = ["mocha", "macchiato", "frappe", "latte"];

  const applyTheme = (theme) => {
    if (theme === "mocha") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  const getCurrentTheme = () => {
    try {
      return localStorage.getItem(THEME_KEY) || "mocha";
    } catch (error) {
      return "mocha";
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {}
  };

  const getNextTheme = (currentTheme) => {
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    return THEMES[nextIndex];
  };

  const themeButton = document.createElement("button");
  themeButton.className = "theme-toggle";
  themeButton.type = "button";
  themeButton.title = "Change theme";
  themeButton.setAttribute("aria-label", "Change theme");
  themeButton.textContent = "Theme";

  themeButton.addEventListener("click", () => {
    const currentTheme = getCurrentTheme();
    const nextTheme = getNextTheme(currentTheme);
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });

  applyTheme(getCurrentTheme());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(themeButton);
    });
  } else {
    document.body.appendChild(themeButton);
  }
})();
