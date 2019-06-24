import { IEntity, Position, UpdateContext, IShaped } from "../types";
import { Vector } from "../vector";
import { updatePosition } from "../utils";
import { Shape } from "../shape";

export class Bullet implements IEntity, IShaped {
  scaleX: number = 1;
  scaleY: number = 1;
  currentDistance = 0;
  active = false;
  position: Vector = new Vector();
  firingVector: Vector = new Vector();
  rotation: number = 0;

  init(position: Vector, firingVector: Vector) {
    this.position = position;
    this.firingVector = firingVector;
    this.rotation = firingVector.angle();
    this.active = true;
  }

  update(context: UpdateContext) {
    updatePosition(context, this.position, this.firingVector);
    this.currentDistance++;
    if (this.currentDistance > 20) {
      this.currentDistance = 0;
      this.active = false;
    }
  }

  shape = new Shape([[-2, -3], [2, -3], [2, 3], [-2, 3], [-2, -3]]);

  render(context: CanvasRenderingContext2D) {
    context.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
    context.rotate(this.rotation);

    context.beginPath();

    context.fillStyle = "#ff0";

    this.shape.draw(context);
    context.fill();
  }
}
