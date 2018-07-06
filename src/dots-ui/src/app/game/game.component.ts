import {Component, Input} from '@angular/core';
import {GameService} from "../service/game.service";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() gameId: number;

  constructor(private gameService: GameService) {}

}
