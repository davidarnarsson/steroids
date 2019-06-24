import { IEntity, Position, UpdateContext } from "../types";
import { Vector } from "../vector";
import { updatePosition, Ease, fromTo } from "../utils";

export class Star implements IEntity {
  active: boolean = true;
  private _opacity: number = 1;
  private _size: number = 2;

  private _opacityUpdater: () => number;

  constructor(public position: Position = new Position(), public velocity: Vector = new Vector()) {
    this._opacityUpdater = fromTo(0.2, 1.0, Math.random() * 5000, Ease.Power4, true);
  }
  update(ctx: UpdateContext): void {
    updatePosition(ctx, this.position, this.velocity);
    this._opacity = this._opacityUpdater();
  }
  render(context: CanvasRenderingContext2D): void {
    context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
    context.beginPath();
    context.fillStyle = `rgba(255,255,255, ${this._opacity})`;
    context.rect(0, 0, this._size, this._size);
    context.fill();
  }
}
