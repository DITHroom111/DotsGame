import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
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
export class GameComponent implements OnInit, AfterViewInit{
  @Input() gameId: number;
  @Input() playerId: number;
  @ViewChild('grid') grid: GridComponent;
  @ViewChild('score') score: ScoreComponent;

  isMyTurn: boolean;

  constructor(private gameService: GameService) {}

  makeTurn(coords: Coords): void {
    this.endTurn();
    this.gameService.makeTurn(coords).subscribe(
      state => {
        this.applyState(state);
        this.getEnemyTurn();
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

  startTurn(): void {
    this.isMyTurn = true;
    this.grid.enable();
  }

  endTurn(): void {
    this.isMyTurn = false;
    this.grid.disable();
  }

  ngOnInit(): void {
    if(this.playerId == 1) {
      this.startTurn();
    } else {
      this.endTurn();
    }
  }

  ngAfterViewInit(): void {
    if(!this.isMyTurn) {
      setTimeout(() => {
        this.getEnemyTurn();
      });
    }
  }

  private getEnemyTurn() {
    this.gameService.getState()
      .subscribe(state => {
        console.log(state);
        this.applyState(state);
        this.startTurn();
      })
  }
}
