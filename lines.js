export function makeLines(container, lineClicks, gridSize) {
  const lineCanvas = document.getElementById("lines");
  const ctx = lineCanvas.getContext("2d");

  function drawDotLine(dot0, dot1) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;

    let startX = dot0.offsetLeft;
    let startY = dot0.offsetTop;
    let endX = dot1.offsetLeft;
    let endY = dot1.offsetTop;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    return {
      end: { x: endX, y: endY },
      direction: { dx: endX - startX, dy: endY - startY },
    };
  }

  function outOfBounds(x) {
    return x < 0 || x > 770;
  }

  function hedger(x) {
    if (x < 0) {
      return 0;
    }
    if (x > 770) {
      return 770;
    }
    return x;
  }

  function loop(x) {
    if (x < 0) {
      return 770;
    }
    if (x > 770) {
      return 0;
    }
    return x;
  }

  function firstBreak(start, direction) {
    let startX = start.x;
    let startY = start.y;
    let endX = start.x + direction.dx;
    let endY = start.y + direction.dy;

    if (!outOfBounds(endX) && !outOfBounds(endY)) {
      return {
        plotstart: { x: startX, y: startY },
        plotend: { x: endX, y: endY },
        nextstart: { x: endX, y: endY },
        nextdirection: { dx: 0, dy: 0 },
      };
    }

    let r =
      direction.dx === 0 ? Infinity : (hedger(endX) - startX) / direction.dx;
    let s =
      direction.dy === 0 ? Infinity : (hedger(endY) - startY) / direction.dy;

    if (r < s) {
      return {
        plotstart: { x: startX, y: startY },
        plotend: { x: hedger(endX), y: startY + r * direction.dy },
        nextstart: { x: loop(endX), y: startY + r * direction.dy },
        nextdirection: {
          dx: (1 - r) * direction.dx,
          dy: (1 - r) * direction.dy,
        },
      };
    }
    return {
      plotstart: { x: startX, y: startY },
      plotend: { x: startX + s * direction.dx, y: hedger(endY) },
      nextstart: { x: startX + s * direction.dx, y: loop(endY) },
      nextdirection: { dx: (1 - s) * direction.dx, dy: (1 - s) * direction.dy },
    };
  }

  function drawPixelLineSegment(start, end, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;

    let startX = start.x;
    let startY = start.y;
    let endX = end.x;
    let endY = end.y;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  function drawPixelLine(start, direction, color) {
    let breakinfo = firstBreak(start, direction);
    drawPixelLineSegment(breakinfo.plotstart, breakinfo.plotend, color);
    while (breakinfo.nextdirection.dx != 0 || breakinfo.nextdirection.dy != 0) {
      breakinfo = firstBreak(breakinfo.nextstart, breakinfo.nextdirection);
      drawPixelLineSegment(breakinfo.plotstart, breakinfo.plotend, color);
    }
    return breakinfo;
  }

  function handleDotClick(lineClicks) {
    let firstLine = drawDotLine(lineClicks[0], lineClicks[1]);
    let start = firstLine.end;
    let direction = firstLine.direction;
    for (let i = 1; i < gridSize; i++) {
      start = drawPixelLine(start, direction, "black").plotend;
    }
  }

  function parallelLines(line) {
    let dot0 = line[0];
    let dot1 = line[1];

    let x1 = dot0.offsetLeft;
    let y1 = dot0.offsetTop;
    let x2 = dot1.offsetLeft;
    let y2 = dot1.offsetTop;

    let sideLength = 770 / gridSize;
    for (let i = 1; i < gridSize; i++) {
      const hue = 30 + (i * 290) / gridSize;
      const color = `hsl(${hue}, 80%, 70%)`;
      let start;
      let direction;
      if (x1 != x2) {
        start = { x: x1, y: (y1 + i * sideLength) % 770 };
        direction = { dx: x2 - x1, dy: y2 - y1 };
      } else {
        start = { x: (x1 + i * sideLength) % 770, y: y1 };
        direction = { dx: x2 - x1, dy: y2 - y1 };
      }
      for (let i = 0; i < gridSize; i++) {
        start = drawPixelLine(start, direction, color).plotend;
      }
    }
  }

  return { handleDotClick, parallelLines };
}
