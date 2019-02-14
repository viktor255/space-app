import { Spacecraft } from './spacecraft.model';
import { Cosmonaut } from './cosmonaut.model';

export interface Spaceflight {
  _id: string;
  distance: number;
  startTime: number;
  isStarted: boolean;
  spacecraft: Spacecraft;
  cosmonauts: Cosmonaut[];
}
