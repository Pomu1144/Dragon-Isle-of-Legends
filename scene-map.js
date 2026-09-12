export const START_SCENE_ID = "spawn-plaza";

export const SCENES = Object.freeze({
  "spawn-plaza": {
    title: "Azurelake Spawn Plaza",
    region: "Azurelake",
    mode: "movement",
    asset: "./azurelake__spawn-plaza__scene__background__night.png",
    hint: "Choose an arrow to move between locations.",
    exits: [
      {
        id: "to-west-gate",
        direction: "left",
        label: "Travel to Azurelake West Gate",
        target: "west-gate-bridge",
        position: { x: 8, y: 55 },
      },
    ],
  },

  "west-gate-bridge": {
    title: "Azurelake West Gate & Bridge",
    region: "Azurelake",
    mode: "movement",
    asset: "./azurelake__west-gate-bridge__scene__background__night.png",
    hint: "Continue through the gate, return to town, or inspect the gate.",
    exits: [
      {
        id: "to-outskirts",
        direction: "up",
        label: "Cross into the Western Outskirts",
        target: "western-outskirts",
        position: { x: 50, y: 17 },
      },
      {
        id: "to-spawn-plaza",
        direction: "right",
        label: "Return to Azurelake Spawn Plaza",
        target: "spawn-plaza",
        position: { x: 92, y: 57 },
      },
      {
        id: "inspect-west-gate",
        direction: "dialogue",
        kind: "dialogue",
        label: "Inspect the West Gate guard post",
        target: "west-gate-dialogue",
        position: { x: 50, y: 43 },
      },
      {
        id: "to-lakeside-rampart",
        direction: "left",
        label: "Lakeside Rampart — scene art needed",
        planned: true,
        position: { x: 8, y: 57 },
      },
    ],
  },

  "west-gate-dialogue": {
    title: "West Gate Guard Post",
    region: "Azurelake",
    mode: "dialogue",
    asset: "./azurelake__west-gate-bridge__scene__dialogue-background__night.png",
    hint: "Dialogue scenes return to their parent location.",
    exits: [
      {
        id: "close-dialogue",
        direction: "down",
        label: "Return to Azurelake West Gate",
        target: "west-gate-bridge",
        position: { x: 50, y: 86 },
      },
    ],
  },

  "western-outskirts": {
    title: "Western Outskirts Road",
    region: "Azurelake Outskirts",
    mode: "movement",
    asset: "./azurelake__western-outskirts__scene__road__night.png",
    hint: "The forest lies ahead; the town gate remains behind you.",
    exits: [
      {
        id: "to-forest-entrance",
        direction: "up",
        label: "Continue to the Western Forest entrance",
        target: "western-forest-entrance",
        position: { x: 53, y: 15 },
      },
      {
        id: "to-west-gate",
        direction: "down",
        label: "Return to Azurelake West Gate",
        target: "west-gate-bridge",
        position: { x: 50, y: 88 },
      },
    ],
  },

  "western-forest-entrance": {
    title: "Western Forest Entrance",
    region: "Western Forest",
    mode: "movement",
    asset: "./azurelake__western-forest__scene__entrance__night.png",
    hint: "Follow the road deeper into the forest.",
    exits: [
      {
        id: "to-waystone-fork",
        direction: "up",
        label: "Continue to Waystone Fork",
        target: "waystone-fork",
        position: { x: 50, y: 16 },
      },
      {
        id: "to-outskirts",
        direction: "down",
        label: "Return to the Western Outskirts",
        target: "western-outskirts",
        position: { x: 50, y: 88 },
      },
    ],
  },

  "waystone-fork": {
    title: "Waystone Fork",
    region: "Western Forest",
    mode: "movement",
    asset: "./azurelake__western-forest__scene__waystone-fork__night.png",
    hint: "The left route is open. The right route is planned for a later scene.",
    exits: [
      {
        id: "to-mosswood-trail",
        direction: "up-left",
        label: "Take the left path to Mosswood Trail",
        target: "mosswood-trail",
        position: { x: 27, y: 17 },
      },
      {
        id: "to-future-right-path",
        direction: "up-right",
        label: "Right forest path — scene art needed",
        planned: true,
        position: { x: 73, y: 17 },
      },
      {
        id: "to-forest-entrance",
        direction: "down",
        label: "Return to the Western Forest entrance",
        target: "western-forest-entrance",
        position: { x: 50, y: 89 },
      },
    ],
  },

  "mosswood-trail": {
    title: "Mosswood Trail",
    region: "Western Forest",
    mode: "movement",
    asset: "./azurelake__western-forest__scene__mosswood-trail__night.png",
    hint: "This is the current end of the playable left route.",
    exits: [
      {
        id: "continue-mosswood",
        direction: "up-left",
        label: "Deeper Mosswood — scene art needed",
        planned: true,
        position: { x: 26, y: 16 },
      },
      {
        id: "to-waystone-fork",
        direction: "down-right",
        label: "Return to Waystone Fork",
        target: "waystone-fork",
        position: { x: 77, y: 86 },
      },
    ],
  },
});
