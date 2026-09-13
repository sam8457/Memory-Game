import { useState } from 'react'
import Card from "./components/Card.jsx"
import './App.css'

function App() {

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
      <div className='main'>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </>
  );
}

export default App
