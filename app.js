import V from './Vector';
import Particle from './Particle';

let world = document.querySelector('#world');
let width = world.width = window.innerWidth;
let height = world.height = window.innerHeight;
let canvas = world.getContext('2d'); // World is the canvas and canvas is the context, yes


let particles = []; // List of particles

let justAConstantFieldVectorLol = new V(0, 0, 1);
function field(S) {
  // return justAConstantFieldVectorLol;
  // return new V(0, 0, 5*S.abs()/width);
  return new V(0, 0, Math.sin(S.abs()*0.01));
  // return new V(0, 0, S.x/width);
}


let lastT = performance.now();

function loop(nowT) {
  let dt = (nowT - lastT)/1000.0;
  lastT = nowT;

  canvas.fillStyle = 'black';
  canvas.fillRect(0, 0, width, height);

  canvas.fillStyle = canvas.strokeStyle = '#ffffff15';
  canvas.lineWidth = 7;
  for (let i = 40; i < height-40; i += 80) {
    for (let j = 40; j < width-40; j += 80) {
      let f = field(new V(j, i, 0));
      canvas.beginPath();
      canvas.arc(j, i, f.abs()*38.0, 0, 2.0*Math.PI);
      canvas[f.z < 0 ? 'fill' : 'stroke']();
    }
  }

  for (let i = particles.length-1; i >= 0; i--) {
    // Loop through all of the particles

    particles[i].update(field, dt);
    particles[i].draw(canvas);
  }
  
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

particles.push(new Particle(
  -1, 
  new V(width/2.0, height/2.0, 0), 
  new V(0, -100.0, 0)
));

let addParticle = (e) => {
  particles.push(new Particle(
    1, 
    new V(e.clientX, e.clientY, 0), 
    new V(0, -100.0, 0)
  ));
  
};

window.addEventListener('click', addParticle);
window.addEventListener('touchend', addParticle);
