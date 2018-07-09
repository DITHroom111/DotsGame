import {Component, EventEmitter, Output, SimpleChanges} from '@angular/core';
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
  @Input() enabled: boolean = true;
  @Output() onSetDot: EventEmitter<Coords> = new EventEmitter <Coords>();

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

  setDot(): void {
    if(this.enabled && !this.isDot) {
      this.onSetDot.emit(this.coords);
    }
  }

  putDot(owner: Player): void {
    this.owner = owner;
    this.isDot = true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.enabled) {
      this.enabled = changes.enabled.currentValue;
    }
  }
}

