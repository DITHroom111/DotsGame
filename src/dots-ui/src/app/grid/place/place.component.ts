import {Component} from '@angular/core';
import {ENEMY, ME, Player} from '../../shared/player.model';
import {Walls} from './walls.model';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {Coords} from '../../shared/coords.model';

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit{
  @Input() coords: Coords;

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

  showGhostDot(): void {
    if(!this.isDot) {
      this.isGhostDot = true;
    }
  }
  hideGhostDot(): void {
    if(!this.isDot) {
      this.isGhostDot = false;
    }
  }

  putDot(): void {
    if(!this.isDot) {
      this.isDot = true;
      console.log(this.coords);
    }
  }

  ngOnInit(): void {
  }
}

