import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{
  ngOnInit(): void {
    console.log('shit');
  }

}
