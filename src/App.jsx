import { useState } from 'react';
import Card from "./components/Card.jsx";
import './App.css';

function App() {

  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const [playerTurn, setPlayerTurn] = useState("p1");

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
  
  let selectedCards = [];
  for (let card in gameBoard) {
    if (card.selected) {
      selectedCards.append(card.position);
    };
  };

  function toggleSelected(cardSpot){
    let newGameBoard = [...gameBoard];
    newGameBoard[cardSpot]['selected'] = !newGameBoard[cardSpot]['selected'];
    setGameBoard(newGameBoard);
  }

  function handleClick(cardSpot){

    const isFirstClick = selectedCards.length === 0 ? true : false;
    
    toggleSelected(cardSpot);
    console.log(cardSpot);

    if (isFirstClick) {


      // TODO: style based on which one is selected
    } else {
      // TODO: implement Score mechanic
      // TODO: check if IDs match, score if yes, keep turn going, don't score and change turns if no
      // TODO: check which player is active to know whose score to add

    }
  }

  return (
    <>
      <div className='header'>
        <h1>
          Memory Game
        </h1>
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
