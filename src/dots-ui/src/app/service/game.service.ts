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
import {GameData} from "../shared/game-data.model";
import {SpecialEvents} from "../shared/special-events.model";

@Injectable()
export class GameService {
  private apiUrl: string = '/games/';
  private gameId: number;
  private playerId: number;

  constructor(private http: HttpClient) {
  }

  startGame(): Observable<GameData> {
    //return this.http.post<number>(this.apiUrl, {}, {});
    return of({gameId: 0, playerId: 1});
  }

  makeTurn(coords: Coords): Observable<State> {
    let dots: Dot[] = [new Dot(ME, new Coords(1, 2)),
                       new Dot(ME, new Coords(2, 1)),
                       new Dot(ME, new Coords(3, 2)),
                       new Dot(ME, new Coords(2, 3))];
    return of({
      score: Score.of(40, 20),
      newDots: dots,
      newWalls: [new Wall(dots)],
      specialEvents: SpecialEvents.GAMEOVER
    });
  }

  getState(): Observable<State> {
    return of({
      score: Score.of(14, 88),
      newDots: [new Dot(ENEMY, new Coords(0,0))],
      newWalls: [],
      specialEvents: SpecialEvents.NONE
    })
  }

  private fromDto(dotDto: {owner: number, coords: Coords}): Dot {
    let ownerPlayer = dotDto.owner == this.playerId? ME : ENEMY;
    return new Dot(ownerPlayer, dotDto.coords);
  }

  reset() {
    this.playerId = undefined;
    this.gameId = undefined;
  }

  resign(): Observable<State> {
    return of({
      score: Score.of(14,88),
      newDots: [],
      newWalls: [],
      specialEvents: SpecialEvents.GAMEOVER
    })
  }
}
