import React from 'react';

class SideBar extends React.Component {

    render(){
        return (
             <div className="side-bar">
                    <p id="timer"> </p>
                    <h3>score <span id="score"> </span></h3>
                    <div className="listbox-area">
                        <div className="left-area">
                            <span id="ss_elem"><h5>words </h5></span>
                            <ul id="ss_elem_list" tabindex="0" role="listbox" aria-labelledby="ss_elem"> </ul>
                        </div>
                    </div>
              </div>
        )
    }
}

export default SideBar;
