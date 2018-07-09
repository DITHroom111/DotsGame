import {Score} from "./score.model";
import {Dot} from "./dot.model";
import {Wall} from "./wall.model";

export class State{
  score: Score;
  newDots: Dot[];
  newWalls: Wall[];
  specialEvents: string = null;
}
