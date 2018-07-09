import {Player} from "./player.model";
import {Coords} from "./coords.model";

export class Dot {
  owner: Player;
  coords: Coords;

  constructor(owner: Player, coords: Coords) {
    this.owner = owner;
    this.coords = coords;
  }
}
