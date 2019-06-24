import { UpdateContext, IEntity } from "../types";

export class Space implements IEntity {
  active: boolean = true;

  update(context: UpdateContext): void {}

  render(context: CanvasRenderingContext2D) {
    context.setTransform(1, 0, 0, 1, 0, 0);

    context.fillStyle = "#000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }
}
