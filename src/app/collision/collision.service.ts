import { Injectable } from '@angular/core';
import { IPosition } from '../models/IPosition';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  constructor() { }

  // retrieve distance between 2 circles
  getDistance(pos1: IPosition,
              pos2: IPosition) {
    
    const centreDistance =
      Math.sqrt(Math.pow((pos1.x - pos2.x), 2) +
      Math.pow((pos1.y - pos2.y),2));

    return centreDistance;
  }
}
