import React from 'react';
import Square from './Square.jsx'
//import _ from 'lodash';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const UNSEL_COL = 'lightblue';
const SEL_COL = 'red';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.letters = new Array(16).fill(null).map(() => this.getRandomLetter());
        this.state = {
            squares: this.fillSquares(),
            currentWord: [],
            words: [],
        }
    }
    fillSquares(){
        let squares = [];
        this.letters.forEach(
            (letter, id) => 
            squares.push(this.renderSquare(id, letter))
        );
        return squares; 
    }
    changeSquareColor(square_id, color){
        const squares = this.state.squares.slice();
        console.log("square: " + square_id + " " + squares[square_id].props);
        //squares[square_id].style.background = color;
        this.setState({squares: squares});
    }

    addLetter(square_id){
        console.log("add letter");
        let newCurrentWord = this.state.currentWord.slice();
        newCurrentWord.push(this.state.squares[square_id]);
        this.setState({currentWord: newCurrentWord}, () => 
            console.log("current word: " + this.state.currentWord.map(letter => letter.children))
        );
        this.changeSquareColor(square_id, SEL_COL);
    }
    removeLetter(square_id) {
        // you can only remove last square added, but needs to be at Square component
        console.log(`remove letter of square_id: ${square_id}`);
        let currWord = this.state.currentWord;
        let currentWord = currWord.slice();
        currentWord.pop();
        this.setState({currentWord: currentWord}, () =>
            console.log("current word: " + this.state.currentWord.map(a => a.children))
        );
        this.changeSquareColor(square_id, UNSEL_COL);
    }

    isSelectable(curr){
        const word = this.state.currentWord;
        if (word.length === 0)
            return true;
        const prev = word[word.length-1].id;
        const isSelected = word.includes(this.state.squares[curr]);
        console.log("isSelected: " + isSelected);
        const isAdj = Math.abs(Math.floor(prev/4)-Math.floor(curr/4)) <= 1 &&
            Math.abs(Math.floor(prev%4)-Math.floor(curr%4)) <= 1;
        return isAdj && !isSelected;
    }

    isUnselectable(curr){
        const word = this.state.currentWord;
        if (word.length > 0){
            const prev = word[word.length-1].id;
            console.log(`unselectable: curr, prev: ${curr}, ${prev}`);
            return curr === prev;
        }
        return false;
    }
    
    isClickable(id){
        const unsel = this.isUnselectable(id) 
        const sel = this.isSelectable(id);
        console.log(`unsel, sel: ${unsel}, ${sel}`);
        return unsel || sel;
    }

    onSquareClicked(id){
        console.log(`SQUARE with id ${id} CLICKED`);
        if (this.isUnselectable(id)){
            this.removeLetter(id);
        }
        else if (this.isSelectable(id)) {
            this.addLetter(id);
        }
    }

    renderSquare(id, letter){
        // return <Square id={id} isClickable={()=> this.isClickable(id)} selectSquare={()=>this.onSquareClicked(id)} >{letter}</Square>;
        return <button style={{background: UNSEL_COL}} id={`sq${id+1}`} onClick={()=>this.onSquareClicked(id)}>
            {letter}</button>;
    }

    getRandomLetter(){
        const rand_i = Math.floor(Math.random()*ALPHABET.length);
        return ALPHABET[rand_i] === 'Q' ? 'Qu' : ALPHABET[rand_i];
    }

    addWord(){
        const currWord = this.state.currentWord;
        if (currWord.length > 2){
            const words = this.state.words.slice();
            // TODO: API FETCH REQUEST TO CHECK IF WORD IS LEGIT
            words.push(currWord.map((square)=>square.children).join(""));
            this.setState({words: words}, function() {
                console.log("words: " + this.state.words);
            });
            this.setState({squares: this.fillSquares});
        }
    }

    render(){

        return (
            <div className="board-wrapper">
                <div className="board">{this.state.squares}</div>
                <div className="buttons">
                    <button id="shuffle-button">play</button>
                    <button onClick={()=>this.addWord()} id="add-button"> add word </button>
                </div> 
            </div>
        );
    }
}

export default Board;