import React from 'react';
import Board from './Board';

class BoardContainer extends React.Component {
    addWord(word){
        console.log(word);
    }
    render(){
        return (
            <div className="game-wrapper">
                <Board addWord={()=>this.addWord()}></Board>
                <div className="buttons">
                    <button id="shuffle-button">play</button>
                    <button onClick={()=> alert()} id="add-button"> add word </button>
                </div> 
            </div>
        )
    }
}

export default BoardContainer;