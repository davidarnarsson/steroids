import { UpdateContext, Position, IEntity, IShaped } from "../types";
import { Vector } from "../vector";
import { updatePosition, wrapDraw, fromTo, Ease } from "../utils";
import { Shape } from "../shape";

export class Asteroid implements IEntity, IShaped {
  active: boolean = true;
  public rotation: number = Math.random() * Math.PI * 0.1;
  rotationUpdater: () => number;

  constructor(public position: Position, public velocity: Vector, public scale: number) {
    const startRotation = 2 * Math.PI * Math.random();

    this.rotationUpdater = fromTo(
      startRotation,
      startRotation + 2 * Math.PI,
      200 + Math.random() * 200,
      Ease.Linear
    );
  }

  update(context: UpdateContext) {
    updatePosition(context, this.position, this.velocity);
    this.rotation = this.rotationUpdater();
  }

  shape = new Shape([
    [-30, -20],
    [-20, -22],
    [5, -12],
    [10, -3],
    [12, 7],
    [17, 15],
    [13, 21],
    [3, 22],
    [-7, 13],
    [-16, 6],
    [-26, -2]
  ]);

  render(context: CanvasRenderingContext2D) {
    const draw = ([a, b]: number[]) => {
      context.setTransform(this.scale, 0, 0, this.scale, a, b);
      context.rotate(this.rotation);

      context.fillStyle = "#c9c9c9";
      context.beginPath();

      this.shape.draw(context);

      context.fill();
    };

    wrapDraw(this.position, context.canvas.width, context.canvas.height, draw);
  }
}
