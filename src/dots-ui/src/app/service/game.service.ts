import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {of} from "rxjs";
import {Coords} from "../shared/coords.model";
import {State} from "../shared/state.model";
import {Score} from "../shared/score.model";
import {Wall} from "../shared/wall.model";
import {Dot} from "../shared/dot.model";
import {ENEMY, ME} from "../shared/player.model";

@Injectable()
export class GameService {
  private apiUrl: string = '/games/';

  constructor(private http: HttpClient) {
  }

  startGame(): Observable<number> {
    //return this.http.post<number>(this.apiUrl, {}, {});
    return of(0);
  }

  makeTurn(coords: Coords): Observable<State> {
    console.log(coords);
    return of({
      score: Score.of(4, 20),
      newDots: [new Dot(ME, coords)],
      newWalls: [],
      specialEvents: null
    });
  }

  getState(): Observable<State> {
    return of({
      score: Score.of(14, 88),
      newDots: [new Dot(ENEMY, new Coords(0,0))],
      newWalls: [],
      specialEvents: null
    })
  }
}
