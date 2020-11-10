import React from 'react';
import './PlayerSelector.css';

class PlayerSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {players_internal : this.props.players};
    };

    render() {
        return(
            <div className = "btn-group">
                <div className = "select-text">Select the number of players...</div>
                <button 
                    type = "button" 
                    className = {`${this.props.players === 2 ? 'active' : 'inactive'} btn`} 
                    onClick = {() => this.props.whenTwo()}>
                    2
                </button>
                <button 
                    type = "button" 
                    className = {`${this.props.players === 4 ? 'active' : 'inactive'} btn`} 
                    onClick = {() => this.props.whenFour()}>
                    4
                </button>
            </div>
        )
    };

};

export default PlayerSelector;