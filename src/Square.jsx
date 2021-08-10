
import React from 'react';
const UNSEL_COL = 'lightblue';
const SEL_COL = 'red';
class Square extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <button style={{background: this.state.color}} id={`sq${this.props.id+1}`} >
            {this.props.children}</button>
        )
    }
}

export default Square;