import React from 'react';
// import Square from './Square.jsx'
//import _ from 'lodash';

const UNSEL_COL = 'lightblue';
const SEL_COL = 'red';
const SERVER_PREFIX = 'http://localhost:3000/';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: null,
            currentWord: [],
            words: [],
        }
    }
 
    async componentDidMount() {
        const response = await fetch(SERVER_PREFIX + 'board');
        const board = await response.json();
        const letters = await [].concat(...board);
        console.log(letters);
        const squares = await letters.map((l, i)=>({id: i, letter: l, selected: UNSEL_COL}));
        this.setState({squares: squares});
        console.log(squares);
    }

    fillSquares(){
        let squares = [];
        this.state.squares.forEach(
            (square, id) => 
            squares.push(this.renderSquare(id, square.letter, square.selected))
        );
        return squares; 
    }
    clearSquares(){
        let squares = [...this.state.squares];
        squares.forEach(function(square){
            square.selected = UNSEL_COL;
        });
        this.setState({squares: squares});
        this.setState({currentWord: []});
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

    async addWord(){
        let currWord = this.state.currentWord;
        if (currWord.length > 2){
            currWord = currWord.map((sqr)=>sqr.letter).join("").toLowerCase();
            const response = await fetch(SERVER_PREFIX + 'check_word', {
                method: 'POST',
                mode: 'cors',
                body: new URLSearchParams({
                    'word': currWord,
                    })
                });

            const isWord = await response.json();
            console.log(isWord);
            if (isWord){
                let wordsCopy = [...this.state.words]
                wordsCopy.push(currWord);
                this.setState({words: wordsCopy}, function(){
                    console.log(this.state.words);
                });
                
            }
        }
        this.clearSquares();
    }

    render(){

        return (
            <div className="board-wrapper">
                <div className="board">{this.state.squares !== null ? this.fillSquares() : <div>...loading</div> }</div>
                <div className="buttons">
                    <button id="shuffle-button">play</button>
                    <button onClick={()=>this.addWord()} id="add-button"> add word </button>
                </div> 
            </div>
        );
    }
}

export default Board;