import { useState } from 'react';
import Card from "./components/Card.jsx";
import './App.css';

function App() {

  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const [playerTurn, setPlayerTurn] = useState("Player 1");

  let starterBoard = [];
  for (let i=0; i<14; i++) {
    starterBoard[i] = {
      id: Math.floor(i/2),
      spot: i,
      imgUrl: '',
      label: i,
      selected: false,
      complete: false,
    }
  }

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

  function clearSelected(){
    // Todo: clear all selected cards
  };

  function handleClick(cardSpot){

    // Todo: Check if card is complete before allowing
    toggleSelected(cardSpot);
    
    // Since selected cards holds a snapshot of the
    // previous react render, this cardSpot will not
    // yet be included in the array.
    const isSecondClick = selectedCards.length === 1 ? true : false;
    
    if (isSecondClick) {

      let firstCard = gameBoard[selectedCards[0]];
      let secondCard = gameBoard[cardSpot];

      if (firstCard.id == secondCard.id) {
        if (playerTurn == "Player 1") {
          setP1Score(p1Score + 1);
        } else {
          setP2Score(p2Score + 1);
        };
      } else {
        if (playerTurn == "Player 1") {
          setPlayerTurn("Player 2");
        } else {
          setPlayerTurn("Player 1");
        };
      };

      // Todo: uncomment when function is finished
      // clearSelected()
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
            onClick={() => {handleClick(card.spot)}}
          />
        ))}
      </div>
    </>
  );
};

export default App;
