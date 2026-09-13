import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='header'>
        <h1>
          Memory Game
        </h1>
        <div>
          <p>Player 1 Score:</p>
          <p>Player 2 Score:</p>
        </div>
      </div>
      <div className='body'>

      </div>
    </>
  );
}

export default App
