import { IShaped } from "../types";
import { Vector } from "../vector";

export function checkCollision({ shape: a, position: aPos }: IShaped, { shape: b, position: bPos }: IShaped) {
  const aNormals = a.normals();
  const bNormals = b.normals();

  for (let i = 0; i < aNormals.length; ++i) {}
}
