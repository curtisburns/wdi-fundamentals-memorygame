var cards = ["queen","queen","king","king"];
var cardsInPlay = [];

//Checks for matches in the cardsInPlay array. Must define before flipCard as we call this function later on.
var checkForMatch = function() {
  if (cardsInPlay.length === 2) {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      alert("You found a match!");
    } else {
      alert("Sorry try again.");
    };
  };
};

//Function for user flipping cards - adds selected cards to cardsInPlay array.
var flipCard = function(cardId) {
console.log(`User flipped ${cards[cardId]}`);
  cardsInPlay.push(cards[cardId]);
  checkForMatch();
};

//Calling flipCard function to test result.
flipCard(3);
flipCard(2);
