import {Component, EventEmitter, Output, QueryList, ViewChildren} from '@angular/core';
import {OnInit} from '@angular/core';
import {Coords} from '../shared/coords.model';
import {GameService} from "../service/game.service";
import {Dot} from "../shared/dot.model";
import {PlaceComponent} from "./place/place.component";
import {Wall} from "../shared/wall.model";

class WallPiece {
  dot: Dot;
  toPrevDot: Coords;
  toNextDot: Coords;

  static of(dot: Dot, prevDot: Dot, nextDot: Dot): WallPiece {
    let piece = new WallPiece;
    piece.dot = dot;
    piece.toPrevDot = dot.directionTo(prevDot);
    piece.toNextDot = dot.directionTo(nextDot);
    return piece;
  }

}

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
    newDots.forEach(dot => this.callByCoords(dot.coords, placeComponent => placeComponent.putDot(dot.owner)));
  }

  setWalls(newWalls: Wall[]): void {
    for(let wall of newWalls) {
      let wallPieces = wall.dots.map((dot, i) => WallPiece.of(dot, wall.getDot(i - 1), wall.getDot(i + 1)));
      wallPieces.forEach(piece => this.callByCoords(piece.dot.coords, placeComponent => placeComponent.putWallPieces(piece.toPrevDot, piece.toNextDot)));
    }
  }

  private getCoords(i: number): Coords {
    return new Coords(i % 39, Math.floor(i / 39));
  }

  private getIndex(coords: Coords): number {
    return coords.x + (coords.y * 39);
  }

  private callByIndex(id: number, func: (placeComponent: PlaceComponent) => any): void {
    this.places.filter((placeComponent, index) => index === id)
      .forEach(func);
  }

  private callByCoords(coords: Coords, func: (placeComponent: PlaceComponent) => any): void {
    this.callByIndex(this.getIndex(coords), func);
  }


}
