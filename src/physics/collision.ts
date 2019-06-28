import { IShaped } from "../types";
import { Vector } from "../vector";
import { round, uniqBy, uniqWith } from "lodash";

function minmaxProjects(vertices: Vector[], axis: Vector): [number, number] {
  let minVal: number = Infinity,
    maxVal: number = -Infinity;

  for (let vertex of vertices) {
    const projected = axis.dot(vertex);

    minVal = Math.min(minVal, projected);
    maxVal = Math.max(maxVal, projected);
  }

  return [minVal, maxVal];
}

function intersects(a: Vector[], b: Vector[], axis: Vector): number | null {
  const [aMin, aMax] = minmaxProjects(a, axis);
  const [bMin, bMax] = minmaxProjects(b, axis);

  // coming in from "right"
  if (bMin >= aMin && bMin <= aMax) {
    return aMax - bMin;
  }

  // coming in from "left"
  if (bMax >= aMin && bMax <= aMax) {
    return bMax - aMin;
  }

  return null;
}

export function checkCollision(a: IShaped, b: IShaped): Vector | null {
  const aEdges = a.shape.vertices(a);
  const bEdges = b.shape.vertices(b);

  const aNormals = a.shape.normals(a);
  const bNormals = b.shape.normals(b);

  const uniqueNormals = uniqWith(
    [...aNormals, ...bNormals],
    (a, b) => a.sub(b).length() <= 0.00001
  );

  let smallestIntersection = Infinity,
    smallestAxis = null;

  for (let normal of uniqueNormals) {
    const intersection = intersects(aEdges, bEdges, normal.unit());

    if (!intersection) {
      return null;
    }

    if (smallestIntersection > intersection) {
      smallestIntersection = intersection;
      smallestAxis = normal;
    }
  }

  return smallestAxis!.unit().mul(smallestIntersection);
}
