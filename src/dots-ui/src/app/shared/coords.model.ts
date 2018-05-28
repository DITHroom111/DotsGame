export class Coords{
  private _x: number;
  private _y: number;

  set x(x: number) {
    if(x >= 0 && x <=38) {
      this._x = x;
    } else {
      console.error(`x must be an integer from 0 to 38; attempting to set x = ${x}` )
    }
  }

  set y(y: number) {
    if(y >= 0 && y <=30) {
      this._y = y;
    } else {
      console.error(`y must be an integer from 0 to 30; attempting to set y = ${y}` )
    }
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}
