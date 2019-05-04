export default {
  room: [
    {
      name: "E25S7",
      spawn: [
        {
          name: "1",
          harvester: 1,
          upgrader: 2,
          builder: 0
        }
      ]
    }
  ]
} as PropertyConfig;

export interface PropertyConfig {
  room: RoomConfig[];
}

export interface RoomConfig {
  name: string;
  spawn: SpawnConfig[];
}

export interface SpawnConfig {
  name: string;
  harvester: number;
  upgrader: number;
  builder: number;
}

export interface CreepConfig {
  name: string;
}
