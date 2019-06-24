import { IEntity, UpdateContext } from "../types";
import { remove } from "lodash";

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
      if (entity.active) {
        entity.update(ctx);
      }
    }
  }

  render(context: CanvasRenderingContext2D): void {
    for (let entity of this.entities) {
      if (entity.active) {
        entity.render(context);
      }
    }
  }
}
