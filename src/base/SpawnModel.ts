import { SpawnConfig } from "../property";

export default class {
  constructor(spawn: StructureSpawn, config: SpawnConfig) {
    this.spawn = spawn;
  }

  private spawn: StructureSpawn;
}
