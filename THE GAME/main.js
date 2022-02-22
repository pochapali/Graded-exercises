const prompts = require("prompts");

const Logic = require("./navigationLogic");

async function gameLoop() {
  const initialActionChoices = [
    { title: "Look around", value: "look" },
    { title: "Go to Room", value: "goToRoom" },
    { title: "Attack", value: "attack" },
    {
      title: "Exit game",
      value: "exit",
    },
  ];
  const response = await prompts({
    type: "select",
    name: "value",
    message: "Choose your action",
    choices: initialActionChoices,
  });

  console.log("You selected " + response.value);
  Logic.logic(response.value);
}

process.stdout.write("\033c"); // clear screen on windows
console.log("WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!");
console.log("================================================");
console.log("You walk down the stairs to the dungeons");
gameLoop();
module.exports.gameLoop = gameLoop;
