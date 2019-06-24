export let keyboard: { [key: string]: boolean } = {};

document.addEventListener("keydown", handleDown);
document.addEventListener("keyup", handleUp);

function handleDown(e: KeyboardEvent) {
  
  keyboard[e.key] = true;
}

function handleUp(e: KeyboardEvent) {
  delete keyboard[e.key];
}
