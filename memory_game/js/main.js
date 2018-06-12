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

//array used for checkForMatch
var cardsInPlay = [];
//applies to cards currently selected (max 2)
var selected = document.getElementsByClassName('selected');
//applies to cards that have been matched
var matched = document.getElementsByClassName('matched');
//applies to all cards in game
var dealt = document.getElementsByClassName('dealt');
//applies to cards left to match
var inPlay = document.getElementsByClassName('inPlay');
//message for user: "try again or match found".
var notification = document.getElementById('notification');
//number of moves counter
var noOfMoves = 0;
var movesCounter = document.getElementById('count');
movesCounter.textContent = noOfMoves;

var resetButtonText = function(text) {
  resetButton[0].textContent = text;
};

var resetIncorrect = function() {
  //flips back incorrect selected and adds eventListener back to it
  selected[0].setAttribute('src','images/back.png');
  selected[1].setAttribute('src','images/back.png');
  //removes the last two 'selected' class nodes
  selected[0].className = "dealt inPlay";
  selected[0].className = "dealt inPlay";
  //reapply event listener to cards still inPlay
  for (i=0; i < inPlay.length; i++) {
    inPlay[i].addEventListener('click',flipCard);
  };
}

//Checks for matches in the cardsInPlay array. Must define before flipCard as we call this function later on.
var checkForMatch = function() {
  if (cardsInPlay.length === 2) {

    //adds 1 to number of moves
    movesCounter.textContent = ++noOfMoves;

    //if they're a match...
    if (cardsInPlay[0] === cardsInPlay[1]) {
      notification.textContent = "You found a match!";
      notification.setAttribute('class','fadeOut');
      //moves from selected to match class
      selected[0].className = "dealt matched";
      selected[0].className = "dealt matched";

      //prevents user from clicking any cards for the duration of the message showing
      for (i = 0; i < dealt.length; i++) {
      dealt[i].removeEventListener('click',flipCard);
      };

      setTimeout(function() {for (i = 0; i < inPlay.length; i++) {
        inPlay[i].addEventListener('click',flipCard);
        };
      },750);

      //once all cards are matched, declare user as winner
      if (matched.length === dealt.length) {
        resetButtonText('Winner! Play again');
      }
    } else {
      //if they don't match...
      notification.textContent = "Sorry try again.";
      notification.setAttribute('class','fadeOut');

      //prevents user from clicking any other cards until they have flipped back
      for (i=0; i < inPlay.length; i++) {
        inPlay[i].removeEventListener('click',flipCard);
      }

      //timer to flip incorrect cards back over
      //delayed as cards shouldn't flip before both cards shown
      setTimeout(resetIncorrect,1000);
    }
    //cardsInPlay reset for checkForMatch to function
    cardsInPlay = [];
    setTimeout(function() {
      notification.textContent = "";
      notification.setAttribute('class','');
    }, 750);
  }
}

//Function for user flipping cards - adds selected cards to cardsInPlay array.
var flipCard = function() {
  var cardId = this.getAttribute('data-id');
  this.setAttribute('src',cards[cardId].cardImage);
  //adds class 'selected'
  this.className += " selected";
console.log(`User flipped ${cards[cardId].rank}`);
  cardsInPlay.push(cards[cardId].rank);
console.log(cards[cardId].cardImage);
console.log(cards[cardId].suit);
//prevents user from clicking it again
  this.removeEventListener('click',flipCard);
  checkForMatch();
};

//array of indices for number of cards dealt - update if deck size changes
var cardsIndex = [0,1,2,3];

//fisher-yates shuffle
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  //has to work from back to front
  while (--i > 0) {
    j = Math.floor(Math.random() * (i+1));
    //essentially swaps the indices
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}

var dealOrder = cardsIndex.shuffle();

var createBoard = function() {
  var board = document.getElementById('game-board');
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src','images/back.png');
    cardElement.setAttribute('data-id',dealOrder[i]);
    cardElement.setAttribute('class','dealt inPlay')
    cardElement.addEventListener('click',flipCard);
    board.appendChild(cardElement);
  }
};


//Calling createBoard function to start game.
createBoard();

//resetsGame on click of button
var resetGame = function () {
  dealOrder = cardsIndex.shuffle();
  for (i = 0; i < dealt.length; i++) {
    dealt[i].setAttribute('src','images/back.png');
    dealt[i].setAttribute('data-id',dealOrder[i]);
    dealt[i].setAttribute('class','dealt inPlay');
    dealt[i].addEventListener('click',flipCard);
  };
  resetButtonText('Reset');
  noOfMoves = 0;
  movesCounter.textContent = noOfMoves;
  cardsInPlay = [];
};

var resetButton = document.getElementsByTagName('button');
resetButton[0].addEventListener('click',resetGame);
