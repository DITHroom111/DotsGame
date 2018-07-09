export class Score {
  me: number = 0;
  enemy: number = 0;

  static of(me: number, enemy: number): Score {
    let score = new Score;
    score.me = me;
    score.enemy = enemy;
    return score;
  }
}
