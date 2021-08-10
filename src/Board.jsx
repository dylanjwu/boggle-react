import React from 'react';
// import Square from './Square.jsx'
//import _ from 'lodash';

const UNSEL_COL = 'lightblue';
const SEL_COL = 'red';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.letters = new Array(16).fill('a'); // fetch letters
        this.state = {
            squares: this.letters.map((l, i)=>({id: i, letter: l, selected: UNSEL_COL})),
            currentWord: [],
            words: [],
        }
    }
    async getBoard() {
        const resp = await fetch('http://localhost:3000/board');
        return await resp.json();
    }
    async isWord(){
        const resp = await fetch('http://localhost:3000/words');
        return await resp.json();
    }
    fillSquares(){
        let squares = [];
        this.state.squares.forEach(
            (square, id) => 
            squares.push(this.renderSquare(id, square.letter, square.selected))
        );
        return squares; 
    }
    changeSquareColor(square_id, color){
        console.log(`${square_id}: ${color}`)
        const squares = this.state.squares.slice();
        squares[square_id].selected = color
        this.setState({squares: squares});
    }

    addLetter(square_id){
        console.log("add letter");
        let newCurrentWord = this.state.currentWord.slice();
        newCurrentWord.push(this.state.squares[square_id]);
        this.setState({currentWord: newCurrentWord}, () => 
            console.log("current word: " + this.state.currentWord.map(square => square.letter))
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
            console.log("current word: " + this.state.currentWord.map(square => square.letter))
        );
        this.changeSquareColor(square_id, UNSEL_COL);
    }

    isSelectable(curr){
        console.log(curr);
        const word = this.state.currentWord;
        if (word.length === 0)
            return true;
        const prev = word[word.length-1].id;
        const isSelected = word.includes(this.state.squares[curr]);
        const isAdj = Math.abs(Math.floor(prev/4)-Math.floor(curr/4)) <= 1 &&
            Math.abs(Math.floor(prev%4)-Math.floor(curr%4)) <= 1;
        console.log(isAdj, isSelected);
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

    renderSquare(id, letter, selected){
        // return <Square id={id} isClickable={()=> this.isClickable(id)} selectSquare={()=>this.onSquareClicked(id)} >{letter}</Square>;
        return <button style={{background: selected}} id={`sq${id+1}`} onClick={()=>this.onSquareClicked(id)}>
            {letter}</button>;
    }

    addWord(){
        const currWord = this.state.currentWord;
        if (currWord.length > 2){
            const words = this.state.words.slice();
            // TODO: API FETCH REQUEST TO CHECK IF WORD IS LEGIT
            words.push(currWord.map((square)=>square.letter).join(""));
            this.setState({words: words}, function() {
                console.log("words: " + this.state.words);
            });
        }
    }

    displayWords(){
        this.isWord()
            .then(res=>console.log(res))
            .then(data=>data.json())
            .then(toPrint=>console.log(toPrint))
            .catch(err=>console.log(`error: ${err}`));
    }

    render(){

        return (
            <div className="board-wrapper">
                <div className="board">{this.fillSquares()}</div>
                <div className="buttons">
                    <button id="shuffle-button">play</button>
                    <button onClick={()=>this.displayWords()} id="add-button"> add word </button>
                </div> 
            </div>
        );
    }
}

export default Board;