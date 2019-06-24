import { Position, UpdateContext } from "./types";
import { Vector } from "./vector";
export function lerp(from: number, to: number, current: number) {
  return from + current * (to - from);
}

export function clamp(min: number, current: number, max: number) {
  return Math.min(max, Math.max(min, current));
}

export function updatePosition(ctx: UpdateContext, pos: Position, vec: Vector) {
  pos.x += ctx.dt * vec.x;
  pos.y += ctx.dt * vec.y;

  if (pos.x < 0) {
    pos.x = ctx.width;
  }

  if (pos.x > ctx.width) {
    pos.x = 0;
  }

  if (pos.y < 0) {
    pos.y = ctx.height;
  }

  if (pos.y > ctx.height) {
    pos.y = 0;
  }
}

export function rand() {
  return (Math.random() - 0.5) * 2;
}

export function pythagoras(a: number, b: number): number {
  return Math.sqrt(a * a + b * b);
}

export function wrapDraw(
  position: Position,
  width: number,
  height: number,
  draw: (coords: number[]) => void
) {
  [
    [position.x, position.y],
    [position.x - width, position.y],
    [position.x + width, position.y],
    [position.x, position.y - height],
    [position.x, position.y + height]
  ].forEach(p => draw(p));
}

export type Easing = (from: number, to: number, dt: number, total: number) => number;

const Power4: Easing = (from, to, dt, total) => from + Math.pow(dt / total, 4) * (to - from);

const Linear: Easing = (from, to, dt, total) => lerp(from, to, dt / total);

export const Ease = {
  Linear,
  Power4
};

export const fromTo = (from: number, to: number, time: number, ease: Easing, reverse = false) => {
  let current = 0,
    direction = 1;

  return () => {
    current += 1 * direction;

    if (current >= time || current <= 0) {
      direction = reverse ? -1 * direction : 1;
      current = reverse ? current : 0;
    }

    return ease(from, to, current, time);
  };
};
