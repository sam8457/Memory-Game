import { useState, useEffect } from 'react';
import Card from "./components/Card.jsx";
import './App.css';

// not inclusive of max
function randomInt(max) {
  return Math.floor(Math.random() * max);
};

let starterBoard = {};
let spotsLeft = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
const numPairs = spotsLeft.length / 2;
for (let i=0; i<numPairs; i++){

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
starterBoard = Object.values(starterBoard);

function App() {

  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const [playerTurn, setPlayerTurn] = useState("Player 1");

  const [gameBoard, setGameBoard] = useState(starterBoard);

  const [holdPair, setHoldPair] = useState(false);
  useEffect(() => {
    if (!holdPair) return;

    const timer = setTimeout(() => {
      clearSelected()
      setHoldPair(false);
    }, 2000); // delay
    
    return () => clearTimeout(timer);
  }, [holdPair]);
  function clearAfterDelay() {
    setHoldPair(true);
  }
  
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

  const isSecondClick = selectedCards.length === 2 ? true : false;
  if (isSecondClick && !holdPair) {
    let firstCard = gameBoard[selectedCards[0]];
    let secondCard = gameBoard[selectedCards[1]];

    if (firstCard.id == secondCard.id && firstCard.spot != secondCard.spot) {
        
      if (playerTurn == "Player 1") {
        setP1Score(p1Score + 1);
      } else {
        setP2Score(p2Score + 1);
      };

      const firstCardSpot = gameBoard[selectedCards[0]]['spot'];
      const secondCardSpot = gameBoard[selectedCards[1]]['spot'];
      setComplete(firstCardSpot);
      setComplete(secondCardSpot);
      
      clearSelected();

    } else {

      if (playerTurn == "Player 1") {
        setPlayerTurn("Player 2");
      } else {
        setPlayerTurn("Player 1");
      };
      
      clearAfterDelay();
    };
  };

  function handleClick(cardSpot){

    const isComplete = gameBoard[cardSpot]['complete'];
    if (!isComplete && !holdPair) {
      toggleSelected(cardSpot);
    }
    
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
