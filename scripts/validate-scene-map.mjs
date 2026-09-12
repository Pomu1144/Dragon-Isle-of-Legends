import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { SCENES, START_SCENE_ID } from "../scene-map.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

if (!SCENES[START_SCENE_ID]) {
  errors.push(`Start scene does not exist: ${START_SCENE_ID}`);
}

for (const [sceneId, scene] of Object.entries(SCENES)) {
  if (!scene.title || !scene.region || !scene.asset) {
    errors.push(`${sceneId}: title, region, and asset are required`);
  }

  const exitIds = new Set();
  for (const exit of scene.exits ?? []) {
    if (exitIds.has(exit.id)) {
      errors.push(`${sceneId}: duplicate exit id ${exit.id}`);
    }
    exitIds.add(exit.id);

    if (!exit.planned && !SCENES[exit.target]) {
      errors.push(`${sceneId}.${exit.id}: target does not exist (${exit.target})`);
    }

    if (!exit.position || !Number.isFinite(exit.position.x) || !Number.isFinite(exit.position.y)) {
      errors.push(`${sceneId}.${exit.id}: valid percentage position is required`);
    }
  }

  const assetPath = resolve(projectRoot, scene.asset.replace(/^\.\//, ""));
  try {
    await access(assetPath);
  } catch {
    errors.push(`${sceneId}: missing asset ${scene.asset}`);
  }
}

if (errors.length > 0) {
  console.error("Scene map validation failed:\n" + errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Scene map valid: ${Object.keys(SCENES).length} scenes checked.`);
}
