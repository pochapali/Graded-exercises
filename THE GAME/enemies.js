const player = require("./player");
class enemy {
  constructor(
    enemyID,
    enemyName,
    enemyHealth,
    enemyDamage,
    enemyHitProbability
  ) {
    this.enemyID = enemyID;
    this.enemyName = enemyName;
    this.enemyHealth = enemyHealth;
    this.enemyDamage = enemyDamage;
    this.enemyHitProbability = enemyHitProbability;
  }
}

let enemies = [
  new enemy(0, "Sewer Rat", 2, 1, 50),
  new enemy(1, "Giant Dragon", 4, 8, 90),
];
function attackPlayer(enemyID) {
  if (enemies[enemyID].enemyHealth > 0) {
    if (
      Math.floor(Math.random() * 100) < enemies[enemyID].enemyHitProbability
    ) {
      process.stdout.write(
        "Ouch! " + enemies[enemyID].enemyName + " hit you..."
      );
      player.Player.HP = player.Player.HP - enemies[enemyID].enemyDamage;
      if (player.Player.HP > 0) {
        console.log(" But you are alive and can continue your adventure!");
      } else {
        console.log("You are dead, game over!");
        process.exit();
      }
    } else {
      console.log(
        "You got lucky! " + enemies[enemyID].enemyName + " didn't hit you!"
      );
    }
  }
}
function attackEnemy(enemyID) {
  let yourTry = Math.floor(Math.random() * 100);

  if (
    yourTry < player.Player.hitProbability &&
    enemies[enemyID].enemyHealth > 0
  ) {
    console.log(
      "Nice! You just hit the enemy! " +
        enemies[enemyID].enemyName +
        " lost " +
        player.Player.damage +
        " HP!"
    );
    enemies[enemyID].enemyHealth -= player.Player.damage;
    if (enemies[enemyID].enemyHealth == 0) {
      console.log("Enemy is defeated!");
    }
  } else {
    if (enemies[enemyID].enemyHealth == 0) {
      console.log(
        "Please, don't punch a corpse, it's bad in every way and won't make you stronger"
      );
    }
    if (yourTry > player.Player.hitProbability) {
      console.log("Oops, you missed the enemy!");
    }
  }
  if (enemies[enemyID].enemyHealth > 0) {
    attackPlayer(enemyID);
  }
}
module.exports = { enemies, attackPlayer, attackEnemy };
