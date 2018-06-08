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
    //resets cardsInPlay for checkForMatch to function;
    cardsInPlay = [];
  };
};

//Function for user flipping cards - adds selected cards to cardsInPlay array.
var flipCard = function() {
  var cardId = this.getAttribute('data-id');
  this.setAttribute('src',cards[cardId].cardImage);
console.log(`User flipped ${cards[cardId].rank}`);
  cardsInPlay.push(cards[cardId].rank);
console.log(cards[cardId].cardImage);
console.log(cards[cardId].suit);
  checkForMatch();
};

var createBoard = function() {
  var board = document.getElementById('game-board');
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src','images/back.png');
    cardElement.setAttribute('data-id',[i]);
    cardElement.addEventListener('click',flipCard);
    board.appendChild(cardElement);
  }
};

//Calling flipCard function to test result.
createBoard();
