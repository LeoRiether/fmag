import V from './Vector';

module.exports = class Particle {

  constructor(q, S, V) {
    this.q = q;
    this.S = S;
    this.V = V;
    this.color = `hsl(${~~(Math.random()*360)}deg, 65%, 65%)`;
  }

  update(field, dt) {
    this.F = V.cross(this.V, field(this.S)).scale(this.q);

    this.V.addScale$(this.F, dt);
    this.S.addScale$(this.V, dt);
  }

  draw(canvas) {
    // Arrows I mean Vectors
    canvas.fillStyle = canvas.strokeStyle = 'red';
    canvas.lineWidth = 4;
    canvas.beginPath();
    canvas.moveTo(this.S.x, this.S.y);
    canvas.lineTo(this.S.x+this.F.x/2, this.S.y+this.F.y/2);
    canvas.stroke();
    canvas.fillStyle = canvas.strokeStyle = 'blue';
    canvas.beginPath();
    canvas.moveTo(this.S.x, this.S.y);
    canvas.lineTo(this.S.x+this.V.x/2, this.S.y+this.V.y/2);
    canvas.stroke();

    // Particle
    canvas.fillStyle = this.color;
    canvas.beginPath();
    canvas.arc(this.S.x, this.S.y, Math.abs(this.q)*10.0, 0, 2.0*Math.PI);
    canvas.fill();
  }

}