import {Component, Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {Coords} from '../shared/coords.model';
import {Score} from "../shared/score.model";

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit{
  score: Score = new Score;
  ngOnInit(): void {
  }

}
