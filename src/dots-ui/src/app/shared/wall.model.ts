import {Dot} from "./dot.model";

let modulo = function(i: number, n: number): number {
  return (i + n) % n;
};

export class Wall {
  dots: Dot[];

  public getDot(i: number) {
    return this.dots[modulo(i, this.dots.length)];
  }
  constructor(dots: Dot[]) {
    this.dots = dots;
  }

}
