import { RoomConfig } from "../property";

export default class {
  constructor(room: Room, config: RoomConfig) {
    this.room = room;
  }

  private room: Room;
}
