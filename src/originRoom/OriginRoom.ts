import PioneerSpawn from "./spawn/PioneerSpawn";
import { RoomConfig } from "../property";

export default class {
  constructor(config: RoomConfig) {
    this.name = config.name;

    this.spawn = new Map(
      config.spawn.map(spawn => [spawn.name, new PioneerSpawn(spawn)])
    );
  }

  public work() {
    for (const spawn of this.spawn.values()) {
      spawn.work();
    }
  }

  public name: string;
  public spawn: Map<string, PioneerSpawn>;

  private get room() {
    return Game.rooms[this.name];
  }
}
