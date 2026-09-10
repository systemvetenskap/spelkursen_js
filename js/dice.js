console.log("inne");

const buttonElement = document.querySelector("#roll");
const resultElement = document.querySelector("#result");
buttonElement.addEventListener("click", rollDice);

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  resultElement.textContent = dice;

  if (dice <= 3) {
    resultElement.classList.add("low");
    resultElement.classList.remove("high");
  }
}

if (buttonElement) {
}
