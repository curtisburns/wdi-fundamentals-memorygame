var cards = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png" ,
  },
  {
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png",
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png",
  },
  {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png"
  }
];
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
console.log(`User flipped ${cards[cardId].rank}`);
  cardsInPlay.push(cards[cardId].rank);
console.log(cards[cardId].cardImage);
console.log(cards[cardId].suit);
  checkForMatch();
};

//Calling flipCard function to test result.
flipCard(3);
flipCard(1);
