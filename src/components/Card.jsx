import { useState } from 'react';
import "./Card.css";

function Card({onClick, label}) {



    return (
        <div className='card' onClick={onClick}>
            <img src="" alt="image"/>
            <p>{label}</p>
        </div>
    );
};

export default Card;