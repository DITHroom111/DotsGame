import {Component} from '@angular/core';
import {GameService} from "./service/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameIsActive: boolean = false;
  gameId: number;
  playerId: number;

  constructor(private gameService: GameService) {}
  startGame() {
    this.gameService.startGame().subscribe(res => {
      this.gameId = res.gameId;
      this.playerId = res.playerId;
      this.gameIsActive = true;
    });
  }
}
