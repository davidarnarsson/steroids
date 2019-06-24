import { zip } from "lodash";
import { Vector } from "./vector";

export class Shape {
  constructor(public polygons: number[][]) {}

  draw(context: CanvasRenderingContext2D) {
    context.moveTo(this.polygons[0][0], this.polygons[0][1]);

    for (let i = 0; i < this.polygons.length; ++i) {
      const polygon = this.polygons[i];

      context.lineTo(polygon[0], polygon[1]);
    }
  }

  edges() {
    const out = [];

    for (let i = 0; i < this.polygons.length; ++i) {
      const [x0, y0] = this.polygons[i];
      const [x1, y1] = this.polygons[(i + 1) % this.polygons.length];

      out.push(new Vector(x1 - x0, y1 - y0));
    }

    return out;
  }

  normals() {
    return this.edges().map(x => x.normal());
  }
}
