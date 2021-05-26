
import React from 'react';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           selected = false,
        }
    }
    render(){
        return (
            <button onClick={this.select_square()}
            ></button>
        )
    }
    select_square(){
        this.state.selected = !this.state.selected;
    }
}