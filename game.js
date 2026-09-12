import { SCENES, START_SCENE_ID } from "./scene-map.js";

const game = document.querySelector("#game");
const sceneImage = document.querySelector("#scene-image");
const sceneTitle = document.querySelector("#scene-title");
const sceneRegion = document.querySelector("#scene-region");
const sceneHint = document.querySelector("#scene-hint");
const sceneControls = document.querySelector("#scene-controls");
const historyBack = document.querySelector("#history-back");
const routeMessage = document.querySelector("#route-message");

const directionRotation = {
  up: "-45deg",
  right: "45deg",
  down: "135deg",
  left: "225deg",
  "up-left": "-90deg",
  "up-right": "0deg",
  "down-right": "90deg",
  "down-left": "180deg",
  dialogue: "0deg",
};

const history = [];
let currentSceneId = getInitialSceneId();
let messageTimer;

function getInitialSceneId() {
  const hashSceneId = window.location.hash.slice(1);
  return SCENES[hashSceneId] ? hashSceneId : START_SCENE_ID;
}

function showMessage(message) {
  window.clearTimeout(messageTimer);
  routeMessage.textContent = message;
  routeMessage.classList.add("is-visible");
  messageTimer = window.setTimeout(() => {
    routeMessage.classList.remove("is-visible");
  }, 2200);
}

function preloadAdjacentScenes(scene) {
  for (const exit of scene.exits) {
    if (!exit.target || !SCENES[exit.target]) continue;
    const image = new Image();
    image.src = SCENES[exit.target].asset;
  }
}

function makeControl(exit) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "route-control";
  button.dataset.direction = exit.direction;
  button.dataset.kind = exit.kind ?? "movement";
  button.style.setProperty("--x", `${exit.position.x}%`);
  button.style.setProperty("--y", `${exit.position.y}%`);
  button.style.setProperty("--rotation", directionRotation[exit.direction] ?? "-45deg");
  button.setAttribute("aria-label", exit.label);
  button.title = exit.label;

  if (exit.planned) {
    button.disabled = true;
    button.addEventListener("pointerenter", () => showMessage(exit.label));
    return button;
  }

  button.addEventListener("click", () => navigate(exit.target));
  return button;
}

function renderScene(sceneId, { updateHash = true } = {}) {
  const scene = SCENES[sceneId];
  if (!scene) {
    showMessage(`Unknown scene: ${sceneId}`);
    return;
  }

  currentSceneId = sceneId;
  sceneImage.src = scene.asset;
  sceneImage.alt = `${scene.title}, ${scene.region}`;
  sceneTitle.textContent = scene.title;
  sceneRegion.textContent = scene.region;
  sceneHint.textContent = scene.hint;
  sceneControls.replaceChildren(...scene.exits.map(makeControl));
  historyBack.disabled = history.length === 0;
  document.title = `${scene.title} | Dragon Isle of Legends`;

  if (updateHash) {
    window.history.replaceState(null, "", `#${sceneId}`);
  }

  preloadAdjacentScenes(scene);
}

function navigate(targetSceneId) {
  if (!SCENES[targetSceneId] || targetSceneId === currentSceneId) return;

  history.push(currentSceneId);
  game.classList.add("is-transitioning");

  window.setTimeout(() => {
    renderScene(targetSceneId);
    requestAnimationFrame(() => game.classList.remove("is-transitioning"));
  }, 190);
}

function goBack() {
  const previousSceneId = history.pop();
  if (!previousSceneId) return;

  game.classList.add("is-transitioning");
  window.setTimeout(() => {
    renderScene(previousSceneId);
    requestAnimationFrame(() => game.classList.remove("is-transitioning"));
  }, 190);
}

function navigateByDirection(direction) {
  const scene = SCENES[currentSceneId];
  const exit = scene.exits.find(
    (candidate) => candidate.direction === direction && !candidate.planned,
  );

  if (exit) navigate(exit.target);
}

historyBack.addEventListener("click", goBack);

window.addEventListener("keydown", (event) => {
  const keys = {
    ArrowUp: "up",
    ArrowRight: "right",
    ArrowDown: "down",
    ArrowLeft: "left",
  };

  if (event.key === "Escape" || event.key === "Backspace") {
    event.preventDefault();
    goBack();
    return;
  }

  if (keys[event.key]) {
    event.preventDefault();
    navigateByDirection(keys[event.key]);
  }
});

window.addEventListener("hashchange", () => {
  const sceneId = window.location.hash.slice(1);
  if (SCENES[sceneId] && sceneId !== currentSceneId) {
    history.push(currentSceneId);
    renderScene(sceneId, { updateHash: false });
  }
});

renderScene(currentSceneId);
