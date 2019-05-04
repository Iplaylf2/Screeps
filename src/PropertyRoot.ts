import OriginRoom from "./originRoom/OriginRoom";
import property from "./property";

export default {
  room: new Map(property.room.map(room => [room.name, new OriginRoom(room)]))
};
