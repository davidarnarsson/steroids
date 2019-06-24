export class Vector {
  constructor(public x: number = 0, public y: number = 0) {}
  length(): number {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }
  unit() {
    const { x, y } = this;
    const len = this.length() + 0.000000001;
    return new Vector(x / len, y / len);
  }
  angle() {
    return Math.atan2(this.y, this.x + 0.0000001);
  }
  sub({ x: x2, y: y2 }: Vector): Vector {
    const { x, y } = this;
    return new Vector(x - x2, y - y2);
  }
  normal() {
    const { x, y } = this;
    return new Vector(-y, x);
  }
  rhNormal() {
    const { x, y } = this;
    return new Vector(y, -x);
  }

  mul(num: number): Vector {
    const { x, y } = this;
    return new Vector(x * num, y * num);
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  add({ x: x2, y: y2 }: Vector): Vector {
    const { x, y } = this;
    return new Vector(x + x2, y + y2);
  }

  dot({ x: x2, y: y2 }: Vector): number {
    const { x, y } = this;
    return x * x2 + y * y2;
  }

  project(b: Vector): Vector {
    const dp = this.dot(b);

    const len = b.x * b.x + b.y * b.y;

    return new Vector((dp / len) * b.x, (dp / len) * b.y);
  }

  rotate(angle: number, ref: Vector) {
    const { x, y } = this;

    const x0 =
      (x - ref.x) * Math.cos(angle) - (y - ref.y) * Math.sin(angle) + ref.x;
    const y0 =
      (x - ref.x) * Math.sin(angle) + (y - ref.y) * Math.cos(angle) + ref.y;

    return new Vector(x0, y0);
  }
}
