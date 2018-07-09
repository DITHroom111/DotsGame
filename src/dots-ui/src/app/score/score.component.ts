import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Score} from "../shared/score.model";

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit{
  score: Score = new Score();
  ngOnInit(): void {
  }

  setScore(score: Score) {
    Object.assign(this.score, score);
  }
}
