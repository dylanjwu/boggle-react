import React from 'react';
import Board from './Board';

class BoardContainer extends React.Component {

    render(){
        return (
            <div className="game-wrapper">
                <Board></Board>
                <div className="buttons">
                    <button id="shuffle-button">play</button>
                    <button id="add-button"> add word </button>
                </div> 
            </div>
        )
    }
}

export default BoardContainer;