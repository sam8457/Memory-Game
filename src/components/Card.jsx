import { useState } from 'react';
import "./Card.css";

// TODO: put cover over unflipped card
// TODO: delay second card flip so user can see what it is
function Card({label, selected, complete, onClick}) {

    let selectedClass = '';
    let completeClass = '';

    if (selected) {
        selectedClass = "selected";
    }

    if (complete) {
        completeClass = 'complete';
    }

    return (
        <div className={'card ' + selectedClass + " " + completeClass} onClick={onClick}>
            <img src="" alt="image"/>
            <p>{label}</p>
        </div>
    );
};

export default Card;