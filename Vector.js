module.exports = class V {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  addScale$(A, c) {
    this.x += A.x * c;
    this.y += A.y * c;
    this.z += A.z * c;
  }

  scale(c) {
    return new V(c*this.x, c*this.y, c*this.z);
  }

  static cross(A, B) {
    return new V(
      A.y*B.z - A.z*B.y,
      A.z*B.x - A.x*B.z,
      A.x*B.y - A.y*B.x
    );
  }

  abs() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }
};