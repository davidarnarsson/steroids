import { Space } from "./entities/space";
import { Scene } from "./entities/scene";
import { Spaceship } from "./entities/spaceship";
import { Position } from "./types";
import { Vector } from "./vector";
import { range } from "lodash";
import { Asteroid } from "./entities/asteroid";
import { rand } from "./utils";
import { Bullet } from "./entities/Bullet";
import { Star } from "./entities/star";
import { checkCollision } from "./physics/collision";

document.addEventListener("readystatechange", r => {
  if (document.readyState === "complete") {
    run();
  }
});

function run() {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  });

  const context = canvas.getContext("2d")!;

  const bullets = range(5).map(_ => new Bullet());
  const stars = range(50).map(
    () =>
      new Star(
        new Position(canvas.width * Math.random(), canvas.height * Math.random()),
        new Vector(rand(), rand()).mul(0.2)
      )
  );
  const asteroids = range(5).map(
    x =>
      new Asteroid(
        new Position(Math.random() * canvas.width, Math.random() * canvas.height),
        new Vector(rand() * 0.15, rand() * 0.15),
        2
      )
  );
  const space = new Space();
  const ship = new Spaceship(bullets, new Position(canvas.width / 2, canvas.height / 2), new Vector());

  const scene = new Scene();

  scene.add(space);
  scene.add(ship);
  bullets.forEach(b => scene.add(b));
  stars.forEach(a => scene.add(a));
  asteroids.forEach(a => scene.add(a));

  checkCollision(asteroids[0], ship);
  
  let dt = Date.now();

  function loop() {
    const currentTime = Date.now();
    const elapsed = currentTime - dt;

    scene.update({
      dt: elapsed,
      width: canvas.width,
      height: canvas.height
    });
    scene.render(context);

    dt = currentTime;

    requestAnimationFrame(loop);
  }

  loop();
}
