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

  constructor(private gameService: GameService) {}
  startGame() {
    this.gameService.startGame().subscribe(res => {
      this.gameId = res;
      this.gameIsActive = true;
    });
  }
}
