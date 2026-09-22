import { useState } from 'react';
import Card from "./components/Card.jsx";
import './App.css';

// not inclusive of max
function randomInt(max) {
  return Math.floor(Math.random() * max);
};

// Create empty object
let starterBoard = {};
// for number of cards, loop through half as many times
let spotsLeft = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
// TODO: create list of img URLs, or implement external API
const numPairs = spotsLeft.length / 2;

for (let i=0; i<numPairs; i++){

  // during each loop, create two cards:
  // same id, label, and imgUrl
  // selected and complete false
  // different random spots from the spots left
  // stick in object with appropriate label
  const firstCardIndex = randomInt(spotsLeft.length);
  const firstCardSpot = spotsLeft[firstCardIndex];
  spotsLeft.splice(firstCardIndex, 1);

  // TODO: put URLs in from list, index via ID/i
  starterBoard[firstCardSpot] = {
    id: i,
    spot: firstCardSpot,
    imgUrl: '',
    label: i,
    selected: false,
    complete: false,
  };

  const secondCardIndex = randomInt(spotsLeft.length);
  const secondCardSpot = spotsLeft[secondCardIndex];
  spotsLeft.splice(secondCardIndex, 1);

  starterBoard[secondCardSpot] = {
    id: i,
    spot: secondCardSpot,
    imgUrl: '',
    label: i,
    selected: false,
    complete: false,
  };
};

console.log(starterBoard);
starterBoard = Object.values(starterBoard);

function App() {

  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const [playerTurn, setPlayerTurn] = useState("Player 1");

  const [gameBoard, setGameBoard] = useState(starterBoard);
  
  // Consider replacing with a single variable
  // due to react's snapshot rendering
  let selectedCards = [];
  for (let card in gameBoard) {
    if (gameBoard[card].selected) {
      selectedCards.push(gameBoard[card].spot);
    };
  };

  function toggleSelected(cardSpot){
    let newGameBoard = [...gameBoard];
    newGameBoard[cardSpot]['selected'] = !newGameBoard[cardSpot]['selected'];
    setGameBoard(newGameBoard);
  };

  function setComplete(cardSpot){
    let newGameBoard = [...gameBoard];
    newGameBoard[cardSpot]['complete'] = true;
    setGameBoard(newGameBoard);
  }

  function clearSelected(){
    let newGameBoard = [...gameBoard];
    for (let i = 0; i < gameBoard.length; i++) {
      newGameBoard[i]['selected'] = false; 
    }
    setGameBoard(newGameBoard);
  };

  function handleClick(cardSpot){

    // Todo: Check if card is complete before allowing
    const isComplete = gameBoard[cardSpot]['complete'];
    if (!isComplete) {
      toggleSelected(cardSpot);
    }
    
    // Since selected cards holds a snapshot of the
    // previous react render, this cardSpot will not
    // yet be included in the array.
    const isSecondClick = selectedCards.length === 1 ? true : false;
    if (isSecondClick) {

      let firstCard = gameBoard[selectedCards[0]];
      let secondCard = gameBoard[cardSpot];

      if (firstCard.id == secondCard.id && firstCard.spot != secondCard.spot) {
        if (playerTurn == "Player 1") {
          setP1Score(p1Score + 1);
        } else {
          setP2Score(p2Score + 1);
        };

        const firstCardSpot = gameBoard[selectedCards[0]]['spot'];
        setComplete(firstCardSpot);
        setComplete(cardSpot); //2nd card
        
        // Todo: mark cards as scored/finished
      } else {
        if (playerTurn == "Player 1") {
          setPlayerTurn("Player 2");
        } else {
          setPlayerTurn("Player 1");
        };
      };

      clearSelected()
    };
  };

  return (
    <>
      <div className='header'>
        <h1>
          Memory Game
        </h1>
        <h2>{playerTurn}'s Turn</h2>
        <div>
          <p>Player 1 Score: {p1Score}</p>
          <p>Player 2 Score: {p2Score}</p>
        </div>
      </div>
      <div className='main'>
        {gameBoard.map((card) => (
          <Card
            key={card.spot}
            label={card.label}
            selected={card.selected}
            complete={card.complete}
            onClick={() => {handleClick(card.spot)}}
          />
        ))}
      </div>
    </>
  );
};

export default App;
