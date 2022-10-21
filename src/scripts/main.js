'use strict';

const canvas = document.getElementById('canvas');
const buttonClear = document.getElementById('clear');
const ctx = canvas.getContext('2d');
const offsetX = canvas.offsetLeft;
const offsetY = canvas.offsetTop;
const storedLines = [];
const storedPoints = [];
let startPosition = {
  x: 0,
  y: 0,
};
let endPosition = {
  x: 0,
  y: 0,
};
let isDown;
let click = 0;

const getClientOffset = (event) => {
  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;

  return {
    x,
    y,
  };
};

function pointSearch(A, B) {
  const denominator = ((B.y2 - B.y1) * (A.x2 - A.x1)
  - (B.x2 - B.x1) * (A.y2 - A.y1));

  if (denominator === 0) {
    return false;
  }

  const ua = ((B.x2 - B.x1) * (A.y1 - B.y1)
  - (B.y2 - B.y1) * (A.x1 - B.x1)) / denominator;
  const ub = ((A.x2 - A.x1) * (A.y1 - B.y1)
  - (A.y2 - A.y1) * (A.x1 - B.x1)) / denominator;

  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  const x = Math.round(A.x1 + ua * (A.x2 - A.x1));
  const y = Math.round(A.y1 + ua * (A.y2 - A.y1));

  return {
    x,
    y,
  };
}

function handleMouseDown(e) {
  if (click === 0 && e.button === 0) {
    startPosition = getClientOffset(e);
    isDown = true;
    click = 1;
  } else {
    endPosition = getClientOffset(e);

    const newLine = {
      x1: startPosition.x,
      y1: startPosition.y,
      x2: endPosition.x,
      y2: endPosition.y,
    };

    for (let i = 0; i < storedLines.length; i++) {
      const newPoint = pointSearch(storedLines[i], newLine);

      if (newPoint && e.button !== 2) {
        storedPoints.push(newPoint);
      }
    }

    if (e.button === 0) {
      storedLines.push(newLine);
    };

    redrawStoredLinesAndPoints();
    click = 0;
    isDown = false;
  }
}

function handleMouseMove(e) {
  if (!isDown) {
    return;
  }
  redrawStoredLinesAndPoints();
  endPosition = getClientOffset(e);

  const newLine = {
    x1: startPosition.x,
    y1: startPosition.y,
    x2: endPosition.x,
    y2: endPosition.y,
  };

  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y);
  ctx.lineTo(endPosition.x, endPosition.y);
  ctx.stroke();

  for (let i = 0; i < storedLines.length; i++) {
    const newPoint = pointSearch(storedLines[i], newLine);

    if (newPoint) {
      ctx.fillStyle = 'red';
      ctx.beginPath();

      ctx.arc(
        newPoint.x,
        newPoint.y,
        5,
        0,
        (Math.PI + (Math.PI * 2) / 2),
        true
      );
      ctx.fill();
      ctx.stroke();
    }
  }
}

function handleMouseOut(e) {
  if (!isDown) {
    return;
  }

  isDown = false;
  click = 0;
  endPosition = getClientOffset(e);

  const newLine = {
    x1: startPosition.x,
    y1: startPosition.y,
    x2: endPosition.x,
    y2: endPosition.y,
  };

  for (let i = 0; i < storedLines.length; i++) {
    const newPoint = pointSearch(storedLines[i], newLine);

    if (newPoint) {
      storedPoints.push(newPoint);
    }
  }

  storedLines.push(newLine);
  redrawStoredLinesAndPoints();
}

function redrawStoredLinesAndPoints() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (storedLines.length === 0) {
    return;
  }

  for (let i = 0; i < storedLines.length; i++) {
    ctx.beginPath();
    ctx.moveTo(storedLines[i].x1, storedLines[i].y1);
    ctx.lineTo(storedLines[i].x2, storedLines[i].y2);
    ctx.stroke();
  }

  for (let i = 0; i < storedPoints.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = 'red';

    ctx.arc(
      storedPoints[i].x,
      storedPoints[i].y,
      5,
      0,
      (Math.PI + (Math.PI * 2) / 2),
      true
    );
    ctx.fill();
    ctx.stroke();
  }
}

function clear() {
  const intervalID = setInterval(animateClear, 100);

  setTimeout(() => {
    storedLines.length = 0;
    storedPoints.length = 0;
    animateClear();
    clearInterval(intervalID);
  }, 3000);
}

function animateClear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < storedLines.length; i++) {
    const x = (Math.abs(storedLines[i].x1 - storedLines[i].x2) / 20);
    const y = (Math.abs(storedLines[i].y1 - storedLines[i].y2) / 20);

    if (x <= 1 && y <= 1) {
      return;
    }

    const x1 = storedLines[i].x1 > storedLines[i].x2
      ? storedLines[i].x1 - x
      : storedLines[i].x1 + x;
    const y1 = storedLines[i].y1 > storedLines[i].y2
      ? storedLines[i].y1 - y
      : storedLines[i].y1 + y;

    const x2 = storedLines[i].x2 > storedLines[i].x1
      ? storedLines[i].x2 - x
      : storedLines[i].x2 + x;
    const y2 = storedLines[i].y2 > storedLines[i].y1
      ? storedLines[i].y2 - y
      : storedLines[i].y2 + y;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    storedLines[i] = {
      x1,
      y1,
      x2,
      y2,
    };

    for (let j = 0; j < storedLines.length; j++) {
      const newPoint = pointSearch(storedLines[i], storedLines[j]);

      if (newPoint) {
        storedPoints.push(newPoint);
      }
    }
  }

  for (let j = 0; j < storedPoints.length; j++) {
    ctx.beginPath();
    ctx.fillStyle = 'red';

    ctx.arc(
      storedPoints[j].x,
      storedPoints[j].y,
      5,
      0,
      (Math.PI
      + (Math.PI * 2) / 2),
      true
    );
    ctx.fill();
    ctx.stroke();
  }

  storedPoints.length = 0;
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseout', handleMouseOut);
buttonClear.addEventListener('click', clear);
