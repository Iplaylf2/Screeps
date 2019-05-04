import { CreepConfig } from "../../property";
import BaseCreep from "./BaseCreep";

export default class extends BaseCreep {
  constructor(config: CreepConfig) {
    super(config);
    this.body = [WORK, CARRY, MOVE];
  }

  public work() {}

  public body: BodyPartConstant[];
}
