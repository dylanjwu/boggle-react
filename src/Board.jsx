import React from 'react';
import Square from './Square.jsx'

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares = Array(16).fill(null)
        }
    }
    renderSquare(i){
        return <Square id={i}> </Square>;
    }
    render(){
        return (
           <div> 

           </div> 
        );
    }
}