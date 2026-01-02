export function toggleDot(dot) {
  dot.textContent = dot.textContent === "•" ? "×" : "•";
}

export function createDots(container, gridSize) {
  const dots = [];
  const sideLength = 770 / gridSize;
  const padding = sideLength / 2;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const dot = document.createElement("div");
      const x = padding + i * sideLength;
      const y = padding + j * sideLength;

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.position = "absolute";
      dot.style.transform = "translate(-50%, -50%)";
      dot.style.fontSize = "64px";
      dot.textContent = "•";
      dot.style.zIndex = 1;

      dot.x = i;
      dot.y = j;

      container.appendChild(dot);
      dots.push(dot);
    }
  }
  return dots;
}

export function resetDots(dots) {
  dots.forEach((dot) => {
    dot.textContent = "•";
  });
}
