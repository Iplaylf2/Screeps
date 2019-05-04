import PropertyRoot from "./PropertyRoot";

export const loop = function() {
  for (const room of PropertyRoot.room.values()) {
    room.work();
  }
};
