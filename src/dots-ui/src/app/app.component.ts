import {Component} from '@angular/core';
import {GameService} from "./service/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameIsActive: boolean = false;
  playerId: number;

  constructor(private gameService: GameService) {}
  startGame() {
    this.gameService.startGame().subscribe(res => {
      this.playerId = res.playerId;
      this.gameIsActive = true;
    });
  }

  endGame() {
    this.playerId = undefined;
    this.gameService.reset();
    this.gameIsActive = false;
  }
}
