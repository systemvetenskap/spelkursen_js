import { rollDice } from "./game-services.js";

console.log("inne");

const gameCode = "2LRVCQ";

async function init() {
  const result = await rollDice(gameCode);
  console.log(result);
}

await init();
