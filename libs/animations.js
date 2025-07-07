export default function flyToHeader(svgElement) {
  const clone = svgElement.cloneNode(true);
  const cs = getComputedStyle(svgElement);
  clone.style.stroke = cs.stroke;
  clone.style.fill = cs.fill;

  const startRect = svgElement.getBoundingClientRect();
  const targetRect = document
    .querySelector(".header-fav-btn")
    .getBoundingClientRect();

  const P0 = {
    x: startRect.left + startRect.width / 2,
    y: startRect.top + startRect.height / 2,
  };
  const P2 = {
    x: targetRect.left + targetRect.width / 2,
    y: targetRect.top + targetRect.height / 2,
  };

  const arcHeight = Math.min(200, Math.hypot(P2.x - P0.x, P2.y - P0.y) * 1.2);
  const P1 = {
    x: (P0.x + P2.x) / 2,
    y: (P0.y + P2.y) / 2 - arcHeight,
  };

  Object.assign(clone.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: `${startRect.width}px`,
    height: `${startRect.height}px`,
    zIndex: 999999,
    transform: `translate(${P0.x - startRect.width / 2}px, ${
      P0.y - startRect.height / 2
    }px)`,
  });
  document.body.appendChild(clone);

  const duration = 900;
  let startTime = null;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animate(time) {
    if (!startTime) startTime = time;
    const tRaw = (time - startTime) / duration;
    if (tRaw >= 1) {
      clone.remove();
      return;
    }
    const t = easeInOutQuad(tRaw);

    const x = (1 - t) * (1 - t) * P0.x + 2 * (1 - t) * t * P1.x + t * t * P2.x;
    const y = (1 - t) * (1 - t) * P0.y + 2 * (1 - t) * t * P1.y + t * t * P2.y;
    const scale = 1 - 0.8 * t;

    clone.style.transform = `translate(${x - startRect.width / 2}px, ${
      y - startRect.height / 2
    }px) scale(${scale})`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
