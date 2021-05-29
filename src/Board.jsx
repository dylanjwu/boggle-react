import React from 'react';
import Square from './Square.jsx'

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(16).fill(null)
        }
    }
    renderSquare(i){
        return <Square>{i}</Square>;
    }
    render(){
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let grid_items = [];
        for (let i = 0; i < 16; i++){
            grid_items.push(this.renderSquare(i));
        }
        return (
            <div className="grid-container">
            {grid_items}
            </div>
        );
    }
}

export default Board;