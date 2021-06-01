
import React from 'react';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           selected: false,
           color: 'blue'
        }
    }
    render(){
        console.log(`square id: sq${this.props.id+1}`);
        return (
            <button style={{background: this.state.color}} id={`sq${this.props.id+1}`} onClick={()=>this.onSelected()}>
            {this.props.children}</button>
        )
    }

    onSelected(){
        console.log(this.props.id+1);
        this.props.onClick();
        const isBlue = this.state.color === 'blue';
        this.setState({color: isBlue ? 'red' : 'blue'});
    }

}

export default Square;