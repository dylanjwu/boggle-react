
import React from 'react';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           selected: false,
        }
    }
    render(){
        console.log(`square id: sq${this.props.id+1}`);
        return (
            <button id={`sq${this.props.id+1}`}onClick={this.selectSquare()}>
            {this.props.children}</button>
        )
    }
    selectSquare(){
        this.props.onClick();
        console.log("clicked square");
    }
}

export default Square;