class player {
  constructor(HP, name, position, damage, hitProbability) {
    this.HP = HP;
    this.name = name;
    this.position = position;
    this.damage = damage;
    this.hitProbability = hitProbability;
  }
}
// const Players = [new player(10, "P1", 0, 2, 75)];
let Player = new player(10, "P1", 0, 2, 75);
module.exports = { Player };
