import { Spacecraft } from './spacecraft.model';

export interface Spaceflight {
  distance: number;
  startTime: number;
  spacecraft: Spacecraft;
}
