import React from 'react';
import Square from './Square.jsx'
// import _ from 'lodash';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: this.fillSquares(),
            currentWord: []
        }
    }
    fillSquares(){
        let squares = [];
        for (let i = 0; i < 16; i++){
            squares.push(this.renderSquare(i, this.getRandomLetter()));
        }
        return squares; 
    }
    addLetter(square_id){
        console.log("add letter");
        let currentWord = this.state.currentWord.slice();
        currentWord.push(this.state.squares[square_id]);
        this.setState({currentWord: currentWord});
        console.log("current word: " + this.state.currentWord.map(a => a.props.children));
    }
    removeLetter(square_id) {
        console.log("remove letter");
        let currWord = this.state.currentWord;
        if (currWord[currWord.length-1] === this.state.squares[square_id]){
            let currentWord = this.state.currentWord.slice();
            currentWord.pop();
            this.setState({currentWord: currentWord});
            console.log("current word: " + this.state.currentWord.map(a => a.props.children));
        }
    }

    onSquareClicked(id){
        console.log(`SQUARE with id ${id} CLICKED`);
        if (this.state.currentWord.includes(this.state.squares[id])){
            this.removeLetter(id);
        }
        else{
            this.addLetter(id);
        }

    }
    renderSquare(id, letter){
        return <Square id={id} onClick={()=>this.onSquareClicked(id)} >{letter}</Square>;
    }
    getRandomLetter(){
        const rand_i = Math.floor(Math.random()*ALPHABET.length);
        return ALPHABET[rand_i] === 'Q' ? 'Qu' : ALPHABET[rand_i];
    }
    render(){

        return (
            <div className="board">
            {this.state.squares}
            </div>
        );
    }
}

export default Board;