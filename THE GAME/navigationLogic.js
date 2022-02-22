const Rooms = require("./Rooms");
const Player = require("./player");
const Enemies = require("./enemies");
const prompts = require("prompts");
const main = require("./main");
function logic(choice) {
  if (choice === "look") {
    for (
      let i = 0;
      i < Rooms.rooms[Player.Player.position].roomsConnections.length;
      i++
    ) {
      console.log(
        Rooms.rooms[Rooms.rooms[Player.Player.position].roomsConnections[i]]
          .roomName
      );
    }
    if (Rooms.rooms[Player.Player.position].roomsConnections.length == 0) {
      if (Rooms.rooms[Player.Player.position].roomName == "Portal") {
        console.log(
          "Congratulations, the only way to go is the end of this crappy dungeon!"
        );
      } else {
        console.log("No room to go");
      }
    }
    for (
      let i = 0;
      i < Rooms.rooms[Player.Player.position].enemiesIDs.length;
      i++
    ) {
      Enemies.attackPlayer(Rooms.rooms[Player.Player.position].enemiesIDs[i]);
    }
    main.gameLoop();
  }
  if (choice === "goToRoom") {
    if (Rooms.rooms[Player.Player.position] != 3) {
      async function roomChoice() {
        let initialActionChoices = [];
        for (
          let i = 0;
          i < Rooms.rooms[Player.Player.position].roomsConnections.length;
          i++
        ) {
          initialActionChoices.push({
            title:
              Rooms.rooms[
                Rooms.rooms[Player.Player.position].roomsConnections[i]
              ].roomName,
            value:
              Rooms.rooms[
                Rooms.rooms[Player.Player.position].roomsConnections[i]
              ].roomID,
          });
        }

        const response = await prompts({
          type: "select",
          name: "value",
          message: "Choose your path",
          choices: initialActionChoices,
        });

        console.log(
          "You selected to go to " + Rooms.rooms[response.value].roomName
        );
        Player.Player.position = response.value;
        for (
          let i = 0;
          i < Rooms.rooms[Player.Player.position].enemiesIDs.length;
          i++
        ) {
          Enemies.attackPlayer(
            Rooms.rooms[Player.Player.position].enemiesIDs[i]
          );
        }

        if (Player.Player.position == 3) {
          console.log("Well done! happy end! You escaped to the portal!");
          process.exit(0);
        }
        main.gameLoop();
      }

      roomChoice();
    }
  }
  if (choice === "attack") {
    if (Rooms.rooms[Player.Player.position].enemiesIDs.length >= 1) {
      async function enemyChoice() {
        let initialActionChoices = [];
        for (
          let i = 0;
          i < Rooms.rooms[Player.Player.position].enemiesIDs.length;
          i++
        ) {
          initialActionChoices.push({
            title:
              Enemies.enemies[Rooms.rooms[Player.Player.position].enemiesIDs[i]]
                .enemyName,
            value: Rooms.rooms[Player.Player.position].enemiesIDs[i],
          });
        }

        const response = await prompts({
          type: "select",
          name: "value",
          message: "Choose the enemy you want to attack",
          choices: initialActionChoices,
        });

        console.log(
          "You selected to attack " + Enemies.enemies[response.value].enemyName
        );

        Enemies.attackEnemy(response.value);

        main.gameLoop();
      }

      enemyChoice();
    } else {
      console.log("It's safe! No enemy to attack!");
      main.gameLoop();
    }
  }
  if (choice === "exit") {
    process.exit(0);
  }
}
module.exports = { logic };
