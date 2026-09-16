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
    }
  }

  const [gameBoard, setGameBoard] = useState(starterBoard);
  
  function incrementScore(){
    setP1Score(p1Score + 1);
  };

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
          />
        ))}
      </div>
    </>
  );
};

export default App;
