import { IShaped } from "../types";
import { Vector } from "../vector";

function minmaxProjects(
  vertices: Vector[],
  axis: Vector,
  axisProp: "x" | "y"
): [number, number] {
  let minVal: number = Infinity,
    maxVal: number = -Infinity;

  for (let vertex of vertices) {
    const projected = vertex.project(axis)[axisProp];

    minVal = Math.min(minVal, projected);
    maxVal = Math.max(maxVal, projected);
  }

  return [minVal, maxVal];
}

function intersects(
  a: Vector[],
  b: Vector[],
  axis: Vector,
  property: "x" | "y"
): boolean {
  const [aMin, aMax] = minmaxProjects(a, axis, property);
  const [bMin, bMax] = minmaxProjects(b, axis, property);

  const result =
    (bMin >= aMin && bMin <= aMax) || (bMax >= aMin && bMax <= aMax);

  return result;
}

export function checkCollision(a: IShaped, b: IShaped) {
  const aEdges = a.shape.vertices(a);
  const bEdges = b.shape.vertices(b);

  const xAxis = new Vector(1, 0);
  const yAxis = new Vector(0, 1);

  if (
    intersects(aEdges, bEdges, yAxis, "y") &&
    intersects(aEdges, bEdges, xAxis, "x")
  ) {
    console.log(`${typeof a} intersects ${typeof b}`);
  }
}
