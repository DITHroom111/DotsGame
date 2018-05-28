import {Component} from '@angular/core';
import {ENEMY, ME, Player} from '../../shared/player.model';
import {Walls} from './walls.model';

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {
  isDot: boolean = false;
  isGhostDot: boolean = false;
  owner: Player = ME;
  walls: Walls = {
    UL: false,
    U: false,
    UR: false,
    L: false,
    R: false,
    DL: false,
    D: false,
    DR: false
  };

  showGhostDot() {
    if(!this.isDot) {
      this.isGhostDot = true;
    }
  }
  hideGhostDot() {
    if(!this.isDot) {
      this.isGhostDot = false;
    }
  }

  putDot() {
    if(!this.isDot) {
      this.isDot = true;
    }
  }
}

