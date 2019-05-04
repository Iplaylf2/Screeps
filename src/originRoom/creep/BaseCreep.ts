import { CreepConfig } from "../../property";

export default abstract class {
  constructor(config: CreepConfig) {
    this.name = config.name;
  }

  public abstract work(): void;

  public get alive() {
    return this.creep !== undefined;
  }

  public abstract body: BodyPartConstant[];

  public name: string;

  protected harvest(...[source]: Parameters<Creep["harvest"]>) {
    const creep = this.creep;
    const response = creep.harvest(source);
    if (response === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }

  protected transfer(...[target, ...option]: Parameters<Creep["transfer"]>) {
    const creep = this.creep;
    const response = creep.transfer(target, ...option);
    if (response == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }

  protected upgradeController(
    ...[controller]: Parameters<Creep["upgradeController"]>
  ) {
    const creep = this.creep;
    const response = creep.upgradeController(controller);
    if (response == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }
  }

  protected get creep() {
    return Game.creeps[this.name];
  }
}
