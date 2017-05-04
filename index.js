const Canvas = require('drawille');
const line = require('bresenham');
const chalk = require('chalk');
const cSpline = require('cardinal-spline');

// http://www.sportscourtdimensions.com/wp-content/uploads/2015/02/nba_court_dimensions_h.png

const c = new Canvas(188, 100);

const points = cSpline([15, 4, 40, 10, 56, 50, 40, 90, 15, 96], 0.5, 400).reduce((accum, item, i) => {
  const ix = Math.floor(i / 2);
  if (!accum[ix]) {
    accum[ix] = [];
  }
  accum[ix].push(item);
  return accum;
}, []);

function draw() {
  c.clear();
  // bounds
  line(1, 1, 1, 99, c.set.bind(c));
  line(1, 1, 187, 1, c.set.bind(c));
  line(187, 1, 187, 99, c.set.bind(c));
  line(1, 99, 187, 99, c.set.bind(c));

  // left 3-pt line
  line(1, 4, 15, 4, c.set.bind(c));
  line(1, 96, 15, 96, c.set.bind(c));

  points.forEach((point) => {
    c.set(point[0], point[1]);
  });

  // center line
  line(94, 1, 94, 99, c.set.bind(c));
  process.stdout.write(chalk.red(c.frame()));
}

draw();

// setInterval(draw, 1000/24);
