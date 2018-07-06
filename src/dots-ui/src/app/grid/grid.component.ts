import {Component, Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {Coords} from '../shared/coords.model';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{
  ngOnInit(): void {
  }

  getCoords(i: number): Coords {
    return new Coords(i % 39, Math.floor(i / 39));
  }

}
