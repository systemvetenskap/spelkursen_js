// här vill vi ha alla metoder som vårt spel kan använda
// till exempel rollDice

import { post, get } from "./api-engine.js";

export async function rollDice(gameCode) {
  // metoden ska nu in i vårt api och posta
  return post(`games/${gameCode}/roll`);
}
