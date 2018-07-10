import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GameService} from "../service/game.service";
import {Coords} from "../shared/coords.model";
import {GridComponent} from "../grid/grid.component";
import {ScoreComponent} from "../score/score.component";
import {State} from "../shared/state.model";
import {SpecialEvents} from "../shared/special-events.model";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit{
  @Input() playerId: number;

  @Output() close: EventEmitter<any> = new EventEmitter();

  @ViewChild('grid') grid: GridComponent;
  @ViewChild('score') score: ScoreComponent;

  isMyTurn: boolean;

  opponentRequestsDraw: boolean = false;
  opponentDeclinedDraw: boolean = false;
  resigned: boolean = false;
  opponentResigned: boolean = false;
  gameOver: boolean = false;
  win: boolean;
  draw: boolean;

  constructor(private gameService: GameService) {}

  makeTurn(coords: Coords): void {
    this.endTurn();
    this.gameService.makeTurn(coords).subscribe(
      state => {
        this.applyState(state);
        if(!this.gameOver) {
          this.getEnemyTurn();
        }
      }
    )
  }

  private applyState(state: State): void {
    this.score.setScore(state.score);
    this.grid.setDots(state.newDots);
    this.grid.setWalls(state.newWalls);
    this.handleEvent(state.specialEvents);
  }

  startTurn(): void {
    this.isMyTurn = true;
    this.grid.enable();
  }

  endTurn(): void {
    this.opponentDeclinedDraw = false;
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

  resign(): void {
    this.endTurn();
    this.gameService.resign()
      .subscribe(state => {
        this.applyState(state);
        this.resigned = true;
      });
  }

  quit(): void {
    this.close.emit();
  }

  private getEnemyTurn() {
    this.gameService.getState()
      .subscribe(state => {
        this.applyState(state);
        if(this.canStartTurn()) {
          this.startTurn();
        }
      })
  }

  private handleEvent(specialEvents: string) {
    switch(specialEvents) {
      case SpecialEvents.RESIGN:
        this.onOpponentResigned();
        break;
      case SpecialEvents.GAMEOVER:
        this.onGameOver();
        break;
      case SpecialEvents.REQUEST_DRAW:
        this.onRequestDraw();
        break;
      case SpecialEvents.CONFIRM_DRAW:
        this.onConfirmDraw();
        break;
      case SpecialEvents.DECLINE_DRAW:
          this.onDeclineDraw();
    }
  }

  private onOpponentResigned(): void {
    this.opponentResigned = true;
    this.gameOver = true;
    this.win = true;
  }


  private onGameOver(): void {
    this.gameOver = true;
    this.win = !this.resigned && this.score.score.me > this.score.score.enemy;
  }

  private onRequestDraw() {
    this.opponentRequestsDraw = true;
  }

  declineDraw(): void {
    this.opponentRequestsDraw = false;
    this.gameService.declineDraw()
      .subscribe(state => {
        this.applyState(state);
        if (this.canStartTurn()) {
          this.startTurn();
        }
      })
  }

  confirmDraw(): void {
    this.opponentRequestsDraw = false;
    this.gameService.confirmDraw()
      .subscribe(state => {
        this.applyState(state);
        this.draw = true;
      })
  }

  requestDraw() {
    this.endTurn();
    this.gameService.requestDraw()
      .subscribe(state => {
        this.applyState(state);
      });
  }

  private canStartTurn() {
    return !this.opponentRequestsDraw && !this.gameOver
  }

  private onConfirmDraw() {
    this.gameOver = true;
    this.draw = true;
  }

  private onDeclineDraw() {
    this.opponentDeclinedDraw = true;
    this.startTurn();
  }
}
