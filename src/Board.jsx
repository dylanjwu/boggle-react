import React from 'react';
import Square from './Square.jsx'
// import _ from 'lodash';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(16).fill(null)
        }
        this.current_word = [];
    }
    addLetter(square_id){
       this.current_word.push(this.state.squares[square_id]);
    }
    renderSquare(id, letter){
        return <Square id={id} onClick={()=>console.log("Hello")} >{letter}</Square>;
    }
    getRandomLetter(){
        const rand_i = Math.floor(Math.random()*ALPHABET.length);
        return ALPHABET[rand_i] === 'Q' ? 'Qu' : ALPHABET[rand_i];
    }
    render(){
        let grid_items = [];
        for (let i = 0; i < 16; i++){
            grid_items.push(this.renderSquare(i, this.getRandomLetter()));
        }
        return (
            <div className="board">
            {grid_items}
            </div>
        );
    }
}

export default Board;