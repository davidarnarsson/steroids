import { IShaped } from "../types";
import { Vector } from "../vector";
import { round, uniqBy, uniqWith } from "lodash";

function minmaxProjects(vertices: Vector[], axis: Vector): [number, number] {
  let minVal: number = Infinity,
    maxVal: number = -Infinity;

  for (let vertex of vertices) {
    const projected = vertex.project(axis).length();

    minVal = Math.min(minVal, projected);
    maxVal = Math.max(maxVal, projected);
  }

  return [minVal, maxVal];
}

function intersects(a: Vector[], b: Vector[], axis: Vector): boolean {
  const [aMin, aMax] = minmaxProjects(a, axis);
  const [bMin, bMax] = minmaxProjects(b, axis);

  const result =
    (bMin >= aMin && bMin <= aMax) || (bMax >= aMin && bMax <= aMax);

  return result;
}

export function checkCollision(a: IShaped, b: IShaped) {
  const aEdges = a.shape.vertices(a);
  const bEdges = b.shape.vertices(b);

  const aNormals = a.shape.normals(a);
  const bNormals = b.shape.normals(b);

  const uniqueNormals = uniqWith(
    [...aNormals, ...bNormals],
    (a, b) =>
      round(b.x, 4) + round(a.x, 4) + (round(b.y, 4) + round(a.y, 4)) === 0
  );

  if (Date.now() % 100 === 0) {
    console.log(uniqueNormals);
  }

  const xAxis = new Vector(1, 0);
  const yAxis = new Vector(0, 1);

  if (intersects(aEdges, bEdges, yAxis) && intersects(aEdges, bEdges, xAxis)) {
    console.log(`${typeof a} intersects ${typeof b}`);
  }
}
