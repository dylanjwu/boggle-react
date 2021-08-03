
import React from 'react';
const UNSEL_COL = 'lightblue';
const SEL_COL = 'red';
class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           selected: false,
           color: 'lightblue'
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
        if (this.props.canBeSelected()){
            const isUnselected = this.state.color === UNSEL_COL;
            this.setState({color: isUnselected ? SEL_COL : UNSEL_COL});
            this.props.selectSquare();
        }
    }

}

export default Square;