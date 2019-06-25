import { UpdateContext, Position, IEntity, IShaped } from "../types";
import { Vector } from "../vector";
import { updatePosition, wrapDraw, fromTo, Ease } from "../utils";
import { Shape } from "../shape";

export class Asteroid implements IEntity, IShaped {
  active: boolean = true;
  public rotation: number;

  scaleX: number;
  scaleY: number;
  rotationUpdater: () => number;

  constructor(public position: Vector, public velocity: Vector, scale: number) {
    this.rotation = 2 * Math.PI * Math.random();

    this.rotationUpdater = fromTo(
      this.rotation,
      this.rotation + 2 * Math.PI,
      200 + Math.random() * 200,
      Ease.Linear
    );

    this.scaleX = this.scaleY = scale;
  }

  update(context: UpdateContext) {
  //  updatePosition(context, this.position, this.velocity);
    //this.rotation = this.rotationUpdater();
  }

  shape = new Shape([[-30, -30], [30, -30], [30, 30], [-30, 30]]);

  render(context: CanvasRenderingContext2D) {
    const draw = ([a, b]: number[]) => {
      context.setTransform(this.scaleX, 0, 0, this.scaleY, a, b);
      context.rotate(this.rotation);

      context.fillStyle = "#c9c9c9";
      context.beginPath();

      this.shape.draw(context);

      context.fill();
    };

    wrapDraw(this.position, context.canvas.width, context.canvas.height, draw);
  }
}
