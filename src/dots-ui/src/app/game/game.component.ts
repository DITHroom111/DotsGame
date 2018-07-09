import {Component, Input, ViewChild} from '@angular/core';
import {GameService} from "../service/game.service";
import {Coords} from "../shared/coords.model";
import {GridComponent} from "../grid/grid.component";
import {ScoreComponent} from "../score/score.component";
import {State} from "../shared/state.model";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() gameId: number;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('score') score: ScoreComponent;

  constructor(private gameService: GameService) {}

  makeTurn(coords: Coords): void {
    this.grid.disable();
    this.gameService.makeTurn(coords).subscribe(
      state => {
        this.applyState(state);
        this.gameService.getState()
          .subscribe(state => {
            this.applyState(state);
            this.grid.enable()
          })
      }
    )
  }

  private applyState(state: State): void {
    if (state.specialEvents === null) {
      this.score.setScore(state.score);
      this.grid.setDots(state.newDots);
      this.grid.setWalls(state.newWalls);
    }
  }
}
