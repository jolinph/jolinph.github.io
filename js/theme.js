(function () {
  const THEME_KEY = "site-theme";
  const ORDER = ["mocha", "macchiato", "frappe", "latte"];

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme && theme !== "mocha") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || "mocha";
    } catch (_) {
      return "mocha";
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
  }

  function nextTheme(current) {
    const idx = ORDER.indexOf(current);
    return ORDER[(idx + 1) % ORDER.length];
  }

  function labelFor(theme) {
    const map = {
      mocha: "Mocha",
      macchiato: "Macchiato",
      frappe: "Frappé",
      latte: "Latte",
    };
    return map[theme] || theme;
  }

  function createButton(initialTheme) {
    const btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.type = "button";
    btn.title = "Change theme";
    btn.setAttribute("aria-label", "Change theme");
    btn.textContent = labelFor(initialTheme);
    btn.addEventListener("click", () => {
      const current = getSavedTheme();
      const next = nextTheme(current);
      applyTheme(next);
      saveTheme(next);
      btn.textContent = labelFor(next);
    });
    return btn;
  }

  const initial = getSavedTheme();
  applyTheme(initial);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(createButton(getSavedTheme()));
    });
  } else {
    document.body.appendChild(createButton(getSavedTheme()));
  }
})();
