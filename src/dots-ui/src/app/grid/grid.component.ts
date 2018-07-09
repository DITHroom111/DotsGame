import {Component, EventEmitter, Output, QueryList, ViewChildren} from '@angular/core';
import {OnInit} from '@angular/core';
import {Coords} from '../shared/coords.model';
import {GameService} from "../service/game.service";
import {Dot} from "../shared/dot.model";
import {PlaceComponent} from "./place/place.component";
import {Wall} from "../shared/wall.model";

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{
  @Output() onMakeTurn: EventEmitter<Coords> = new EventEmitter<Coords>();
  @ViewChildren(PlaceComponent) places: QueryList<PlaceComponent>;
  enabled: boolean = true;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
  }

  getCoords(i: number): Coords {
    return new Coords(i % 39, Math.floor(i / 39));
  }

  getIndex(coords: Coords): number {
    return coords.x + (coords.y * 39);
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  makeTurn(coords: Coords): void {
    this.onMakeTurn.emit(coords);
  }

  setDots(newDots: Dot[]): void {
    for(let dot of newDots) {
      this.places.filter((placeComponent, index) => index == this.getIndex(dot.coords))
        .forEach(placeComponent => placeComponent.putDot(dot.owner));
    }
  }

  setWalls(newWalls: Wall[]): void {
    // TODO
  }
}
