// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word
};

function simpleScorer(word) {
   word = word.toUpperCase();
   let simpleScore = word.length;
   return simpleScore;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let vowelBonusScore = 0;
   let vowels = ["A", "E", "I", "O", "U"];
   for (let i = 0; i < word.length; i++) {
      if (vowels.indexOf(word[i]) !== -1) {
         vowelBonusScore += 3;
      } else {
         vowelBonusScore += 1;
      }
   } return vowelBonusScore;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
	let scrabbleScore = 0;
	for (let i = 0; i < word.length; i++) {
			scrabbleScore = scrabbleScore + newPointStructure[word[i]];
		}
	return scrabbleScore;
};

let simpleScore = {
   name:"Simple Score",
   description:"Each letter is worth 1 point.",
   scorerFunction: simpleScorer,


};
let vowelBonusScore = {
   name:"Bonus Vowels",
   description:"Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer,
};
let scrabbleScore = {
   name:"Scrabble",
   description:"The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer,
};

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt() {
   let scoreChoice = input.question(`Which Scrabble scoring system would you like to use?
   Enter "0" for Simple Score.
   Enter "1" for Bonus Vowels.
   Enter "2" for Scrabble. `);
   return scoringAlgorithms[scoreChoice];

}

function transform(scoreObject) {
   let newObject = scoreObject;
   let extractedLetter = "";
   let oldPointStructureKeys = [];
   for (key in newObject) oldPointStructureKeys.push(key);
   for (let i = 0; i < oldPointStructureKeys.length; i++) {
      while (newObject[oldPointStructureKeys[i]].length > 0) {
         extractedLetter = newObject[oldPointStructureKeys[i]].shift();
         newObject[extractedLetter.toLowerCase()] = Number(oldPointStructureKeys[i]);
      };
      delete newObject[oldPointStructureKeys[i]];
   }
   return newObject;
};

let newPointStructure = transform(oldPointStructure)

function runProgram() {
   console.log(scorerPrompt().scorerFunction(initialPrompt()))
   
}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
