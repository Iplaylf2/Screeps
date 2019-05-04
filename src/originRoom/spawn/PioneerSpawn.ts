import HarversterCreep from "../creep/HarversterCreep";
import UpgraderCreep from "../creep/UpgraderCreep";
import BuilderCreep from "../creep/BuilderCreep";
import { SpawnConfig } from "../../property";
import BaseCreep from "../creep/BaseCreep";

export default class {
  constructor(config: SpawnConfig) {
    this.name = config.name;

    this.harvester = new Map();
    for (let i = 0; i !== config.harvester; i++) {
      const name = `${this.spawn.name}_harverster_${i}`;
      this.harvester.set(name, new HarversterCreep({ name }));
    }
    this.upgrader = new Map();
    for (let i = 0; i !== config.upgrader; i++) {
      const name = `${this.spawn.name}_upgrader_${i}`;
      this.upgrader.set(name, new UpgraderCreep({ name }));
    }
    this.builder = new Map();
    for (let i = 0; i !== config.builder; i++) {
      const name = `${this.spawn.name}_builder_${i}`;
      this.builder.set(name, new BuilderCreep({ name }));
    }
  }

  public work() {
    this.keepCreep(this.harvester.values());
    this.keepCreep(this.upgrader.values());
    this.keepCreep(this.builder.values());
  }

  public name: string;

  private keepCreep(creepList: Iterable<BaseCreep>) {
    for (const creep of creepList) {
      if (creep.alive) {
        creep.work();
      } else {
        this.spawn.spawnCreep(creep.body, creep.name);
      }
    }
  }

  private get spawn() {
    return Game.spawns[this.name];
  }

  private harvester: Map<string, HarversterCreep>;
  private upgrader: Map<string, UpgraderCreep>;
  private builder: Map<string, BuilderCreep>;
}
