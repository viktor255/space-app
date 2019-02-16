export interface Spaceflight {
  _id: string;
  distance: number;
  startTime: number;
  isStarted: boolean;
  spacecraftId: string;
  cosmonautsIds: string[];
}
