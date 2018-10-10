let test = require('tape');

let V = require('./Vector');
let Particle = require('./Particle');

test('Vector', t => {
  let A = new V(2, 3, 4);
  t.equal(A.scale(5).x, 10, "Vector scaling");

  let B = new V(1, 0, 0);
  let C = new V(0, 1, 0);
  t.equal(V.cross(B, C).z, 1, "Cross product");
  t.end();
});

test('Particle', t => {

  t.end();
});