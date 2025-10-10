(function () {
  const cfg = {
    size: 60,
    spacing: 30,
    speed: 25,
    width: 2,
    fill: "",
    stroke: "",
  };

  const getThemeColors = () => {
    const computedStyle = getComputedStyle(document.documentElement);
    const mauveColor = computedStyle.getPropertyValue("--mauve").trim();

    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return {
      fill: hexToRgba(mauveColor, 0.05),
      stroke: hexToRgba(mauveColor, 0.15),
    };
  };

  const updateColors = () => {
    const colors = getThemeColors();
    cfg.fill = colors.fill;
    cfg.stroke = colors.stroke;
  };

  const canvas = document.createElement("canvas");
  canvas.id = "diamond-background";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none",
  });
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext("2d");
  let grid = cfg.size + cfg.spacing,
    animId,
    offX = 0,
    offY = 0,
    lastTime;

  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };

  const diamond = (x, y, s) => {
    ctx.beginPath();
    ctx.moveTo(x, y - s / 2);
    ctx.lineTo(x + s / 2, y);
    ctx.lineTo(x, y + s / 2);
    ctx.lineTo(x - s / 2, y);
    ctx.closePath();
    ctx.fillStyle = cfg.fill;
    ctx.fill();
    ctx.strokeStyle = cfg.stroke;
    ctx.lineWidth = cfg.width;
    ctx.stroke();
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cols = Math.ceil(canvas.width / grid) + 3;
    const rows = Math.ceil(canvas.height / grid) + 3;
    const startX = (offX % grid) - grid;
    const startY = (offY % grid) - grid;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) diamond(startX + c * grid, startY + r * grid, cfg.size);
  };

  const animate = (t) => {
    if (!lastTime) lastTime = t;
    const dt = (t - lastTime) / 1000;
    lastTime = t;
    offX = (offX - cfg.speed * dt) % grid;
    offY = (offY - cfg.speed * dt) % grid;
    draw();
    animId = requestAnimationFrame(animate);
  };

  const start = () => {
    resize();
    updateColors();
    lastTime = null;
    animId = requestAnimationFrame(animate);
  };

  const stop = () => animId && cancelAnimationFrame(animId);

  const observer = new MutationObserver(() => {
    updateColors();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  addEventListener("resize", resize);
  document.readyState === "loading" ? addEventListener("DOMContentLoaded", start) : start();
  addEventListener("beforeunload", stop);

  window.DiamondBackground = {
    setSpeed: (s) => (cfg.speed = s),
    setSize: (s) => (cfg.size = s),
    setSpacing: (s) => (cfg.spacing = s),
    setColors: (f, s) => {
      if (f) cfg.fill = f;
      if (s) cfg.stroke = s;
    },
    updateColors,
    stop,
    start,
  };
})();
