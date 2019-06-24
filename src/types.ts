import { Shape } from "./shape";
import { Vector } from "./vector";

export interface IEntity {
  update(context: UpdateContext): void;
  render(context: CanvasRenderingContext2D): void;
  active: boolean;
}

export interface IShaped {
  shape: Shape;
  position: Vector;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

export class Position {
  constructor(public x = 0, public y = 0) {}

  offset(x2: number, y2: number): Position {
    return new Position(this.x - x2, this.y - y2);
  }

  scale(x2: number, y2: number): Position {
    return new Position(this.x * x2, this.y * y2);
  }

  clone() {
    return this.offset(0, 0);
  }
}

export interface UpdateContext {
  width: number;
  height: number;
  dt: number;
}
