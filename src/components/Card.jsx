import { useState } from 'react';
import "./Card.css";

function Card({label, selected, onClick}) {

    let selectedClass = '';

    if (selected) {
        selectedClass = "selected";
    }

    return (
        <div className={'card ' + selectedClass} onClick={onClick}>
            <img src="" alt="image"/>
            <p>{label}</p>
        </div>
    );
};

export default Card;