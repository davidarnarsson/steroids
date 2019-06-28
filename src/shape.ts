import { zip } from "lodash";
import { Position, IShaped } from "./types";
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

  vertices(origin: IShaped, rotate: boolean = true) {
    const out = [];
    const { rotation, position, scaleX, scaleY } = origin;

    for (let i = 0; i < this.polygons.length; ++i) {
      const [x0, y0] = this.polygons[i];

      out.push(new Vector(position.x + x0 * scaleX, position.y + y0 * scaleY));
    }

    if (rotate) {
      return out.map(o => o.rotate(rotation, position));
    }

    return out;
  }

  normals(origin: IShaped) {
    const verts = this.vertices(origin);

    const out = [];

    for (let i = 1; i < verts.length; ++i) {
      const v2 = verts[i];
      const v1 = verts[i - 1];

      out.push(v2.sub(v1).normal());
    }

    out.push(verts[0].sub(verts[verts.length - 1]).normal());

    return out;
  }
}
