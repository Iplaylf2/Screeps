import { CreepConfig } from "../property";

export default class {
  constructor(creep: Creep, config: CreepConfig) {
    this.creep = creep;
  }

  private creep: Creep;
}
