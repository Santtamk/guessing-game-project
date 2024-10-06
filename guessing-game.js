const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let secretNumber = 12;
let numAttempts = 3;

const checkGuess = (num) => {
  let num1 = Number(num);
  if (num1 > secretNumber) {
    console.log("Too high");
    return false;
  } else if (num1 < secretNumber) {
    console.log("Too low");
    return false;
  } else if (num1 === secretNumber) {
    console.log("Correct!");
    return true;
  }
};

const askGuess = (guess) => {
  if (checkGuess(guess)) {
    console.log("You win!");
    rl.close();
  } else if (numAttempts > 0) {
    rl.question("Enter a guess: ", askGuess);
    numAttempts--;
  } else if (numAttempts === 0) {
    console.log("You are out of chances");
    rl.close();
  }
};

//

const randomInRange = (min, max) => {
  const minCeiled = Math.ceil(min); //as it rounds up to a higher value
  const maxFloored = Math.floor(max); //rounds down

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};
// secretNumber = randomInRange(min, max);

// console.log(randomInRange(15, 30));

const askRange = (max) => {
  rl.question("Enter a min number: ", (min) => {
    console.log(
      `I'm thinking of a number between ${min} and ${max}... however you get ${numAttempts} chances`
    );
    secretNumber = randomInRange(min, max);
    rl.question("Enter a guess: ", askGuess);
    numAttempts--;
  });
};

const askLimit = (num) => {
  numAttempts = num;
  rl.question("Enter a max number: ", askRange);
};
rl.question("Input the number of rounds : ", askLimit);
