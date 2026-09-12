# Dragon Isle of Legends — Azurelake Scene Navigator

This repository contains a data-driven vertical slice for moving between the current Azurelake scene backgrounds.

## Route

`Azurelake Spawn Plaza → West Gate & Bridge → Western Outskirts Road → Western Forest Entrance → Waystone Fork → Mosswood Trail`

Every completed movement route includes a return path. The West Gate close-up is a dialogue-mode scene. The Lakeside Rampart, Waystone Fork's right branch, and the route beyond Mosswood Trail remain disabled until their scene art exists.

## Run locally

Serve the repository with any static web server, then open `index.html`. For example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Validate the graph

No dependencies are required:

```bash
npm run validate
```

Edit `scene-map.js` to add scenes or change connections. Each non-planned exit must target an existing scene, and every scene asset must exist in the repository.
