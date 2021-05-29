
import React from 'react';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           selected: false,
        }
    }
    render(){
        return (
            <button>
            {this.props.children}</button>
        )
    }
  
}

export default Square;