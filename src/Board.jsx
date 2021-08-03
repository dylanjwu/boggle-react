import React from 'react';
import Square from './Square.jsx'
//import _ from 'lodash';

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
        let newCurrentWord = this.state.currentWord.slice();
        newCurrentWord.push(this.state.squares[square_id]);
        this.setState({currentWord: newCurrentWord}, () => 
            console.log("current word: " + this.state.currentWord.map(a => a.props.children))
        );
    }
    removeLetter(square_id) {
        // you can only remove last square added, but needs to be at Square component
        console.log(`remove letter of square_id: ${square_id}`);
        let currWord = this.state.currentWord;
        let currentWord = currWord.slice();
        currentWord.pop();
        this.setState({currentWord: currentWord}, () =>
            console.log("current word: " + this.state.currentWord.map(a => a.props.children))
        );
    }

    isAdjacent(prev, curr){
        console.log("prev: " + prev);
        console.log("curr: " + curr);
        return Math.abs(Math.floor(prev/4)-Math.floor(curr/4)) <= 1 &&
            Math.abs(Math.floor(prev%4)-Math.floor(curr%4)) <= 1;
    }

    canBeSelected(id){
        const word = this.state.currentWord;
        if (word.length === 0)
            return true;
        
        const lastSquare = word[word.length-1];
        const currSelected = this.state.squares[id].props.selected;
        const prevId = lastSquare.props.id;
        const isAdj= this.isAdjacent(prevId, id);
        console.log(isAdj);
        return (prevId === id && currSelected) || isAdj;
    }

    onSquareClicked(id){
        console.log(`SQUARE with id ${id} CLICKED`);
        console.log(this.state.squares[id].props);
        if (this.state.currentWord.includes(this.state.squares[id])){
            const word = this.state.currentWord;
            const lastSquare = word[word.length-1];
            const prevId = lastSquare.props.id;
            if (prevId === id){
                this.removeLetter(id);
            }
        }
        else{
            this.addLetter(id);
        }

    }

    renderSquare(id, letter){
        return <Square id={id} selected={false} canBeSelected={()=> this.canBeSelected(id)} selectSquare={()=>this.onSquareClicked(id)} >{letter}</Square>;
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