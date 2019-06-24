import { IEntity, Position, UpdateContext, IShaped } from "../types";
import { Vector } from "../vector";
import { updatePosition, wrapDraw } from "../utils";
import { keyboard } from "../input/keyboard";
import { Shape } from "../shape";
import { throttle } from "lodash";
import { Bullet } from "./bullet";

const ROTATION_TICK = Math.PI / 45;
const TWO_PI = 2 * Math.PI;

export class Spaceship implements IEntity, IShaped {
  active: boolean = true;
  lastShotDt = Date.now();
  lastShotIdx = 0;

  constructor(
    public bullets: Bullet[],
    public position: Position,
    public velocity: Vector,
    public rotation: number = 0
  ) {}

  update(ctx: UpdateContext): void {
    if (keyboard.ArrowLeft) {
      this.rotation = (this.rotation - ROTATION_TICK) % TWO_PI;
    }

    if (keyboard.ArrowRight) {
      this.rotation = (this.rotation + ROTATION_TICK) % TWO_PI;
    }

    if (keyboard.ArrowUp) {
      this.velocity.x += Math.cos(this.rotation) * 0.01;
      this.velocity.y += Math.sin(this.rotation) * 0.01;
    }

    if (keyboard.ArrowDown) {
      this.velocity.x -= Math.cos(this.rotation) * 0.01;
      this.velocity.y -= Math.sin(this.rotation) * 0.01;
    }

    if (this.velocity.length() > 0.5) {
      this.velocity = this.velocity.unit().mul(0.5);
    }

    updatePosition(ctx, this.position, this.velocity);

    if (keyboard[" "]) {
      this.fire();
    }
  }

  fire() {
    const now = Date.now();
    if (now - this.lastShotDt > 100) {
      this.lastShotIdx = (this.lastShotIdx + 1) % this.bullets.length;
      this.bullets[this.lastShotIdx].init(
        this.position.clone(),
        new Vector(Math.cos(this.rotation), Math.sin(this.rotation)).mul(2)
      );
      this.lastShotDt = now;
    }
  }

  shape = new Shape([
    [30, 0],
    [10, 10],
    [-20, 15],
    [-40, 35],
    [-40, 37],
    [-40, 5],
    [-45, 5],
    [-45, -5],
    [-40, -5],
    [-40, -37],
    [-40, -35],
    [-20, -15],
    [10, -10],
    [30, 0]
  ]);

  render(context: CanvasRenderingContext2D): void {
    const draw = ([a, b]: number[]) => {
      context.setTransform(1, 0, 0, 1, a, b);

      context.rotate(this.rotation);

      context.strokeStyle = "#fff";
      context.lineWidth = 2;

      context.beginPath();
      this.shape.draw(context);
      context.stroke();
    };

    wrapDraw(this.position, context.canvas.width, context.canvas.height, draw);
  }
}
