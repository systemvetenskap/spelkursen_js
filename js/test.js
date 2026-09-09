console.log("innan");
import { get, post } from "./api-engine.js";

async function getProduct() {
  try {
    const response = await fetch("https://dummyjson.com/products/3?delay=1000");
    if (response.status === 404) {
      throw new Error("produkten finns inte");
    }

    if (!response.ok) {
      throw new Error(response.status);
    }
    const product = await response.json();
    console.log("i metoden");
    return product;
  } catch (error) {
    console.log("Något gick fel", error.message);
  }
}

const product = await getProduct();

async function findMe() {
  const token = localStorage.getItem("token");

  const response = await fetch("https://api.dsvkurs.miun.se/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result.name);
}
const gameCode = "9WTWLS";
try {
  const data = await post(`games/${gameCode}/roll`);
} catch (error) {
  console.error(error.message);
}
const me = await get("auth/me");
console.log(me);
await findMe();
