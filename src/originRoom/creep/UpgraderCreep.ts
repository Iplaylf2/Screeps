import { CreepConfig } from "../../property";
import BaseCreep from "./BaseCreep";

export default class extends BaseCreep {
  constructor(config: CreepConfig) {
    super(config);
    this.body = [WORK, CARRY, MOVE];
  }

  public work() {
    const creep = this.creep;
    switch (creep.memory.plan) {
      case "harverst":
        if (creep.carry.energy < creep.carryCapacity) {
          const source = creep.pos.findClosestByRange(FIND_SOURCES);
          if (source) {
            this.harvest(source);
          }
        } else {
          creep.memory.plan = "upgrade";
          this.work();
        }
        break;
      case "upgrade":
        if (creep.carry.energy > 0) {
          const controller = creep.room.controller;
          if (controller) {
            this.upgradeController(controller);
          }
        } else {
          creep.memory.plan = "harverst";
          this.work();
        }
        break;
      default:
        creep.memory.plan = "harverst";
        this.work();
        break;
    }
  }

  public body: BodyPartConstant[];
}
