import { IEntity, UpdateContext } from "../types";
import { remove } from "lodash";
import { Asteroid } from "./asteroid";
import { Vector } from "../vector";

export class Scene implements IEntity {
  active: boolean = true;
  protected entities: IEntity[] = [];

  add(entity: IEntity): void {
    this.entities.push(entity);
  }

  remove(entity: IEntity): void {
    remove(this.entities, entity);
  }

  update(ctx: UpdateContext): void {
    for (let entity of this.entities) {
      if (!entity.active) continue;
      
      entity.update(ctx);
    }
  }

  renderNormal(
    context: CanvasRenderingContext2D,
    position: Vector,
    normal: Vector
  ) {
    context.beginPath();
    context.strokeStyle = "#f0f";
    context.setTransform(1, 0, 0, 1, position.x, position.y);
    context.rotate(normal.angle());

    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.moveTo(0, 0);
    context.lineTo(0, -20);
    context.lineTo(5, -15);
    context.moveTo(0, -20);
    context.lineTo(-5, -15);
    context.stroke();
  }

  render(context: CanvasRenderingContext2D): void {
    for (let entity of this.entities) {
      if (!entity.active) continue;

      entity.render(context);

      if (entity instanceof Asteroid) {
        const edges = entity.shape.vertices(entity);
        const normals = entity.shape.normals(entity);

        for (let i = 0; i < edges.length; ++i) {
          this.renderNormal(context, edges[i], normals[i]);
        }
      }
    }
  }
}
