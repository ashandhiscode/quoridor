import React from 'react';
import NameInput from './NameInput';

class EntryInformation extends React.Component {

    state = {text : {1: null,  2: null, 3 : null, 4 : null}}

    updatePlayer = (number, text) => {
        const obj = this.state.text
        obj[number] = text
        this.setState({text : obj})
    }
    
    renderContent() {
        if (this.props.players === 2) {
            return (
                <div>
                <NameInput text = {this.state.text[1]} onChange = {(number, text) => this.updatePlayer(number, text)} number = '1'/>
                <NameInput text = {this.state.text[2]} onChange = {(number, text) => this.updatePlayer(number, text)} number = '2'/>
                </div>
            )
        }
        
        if (this.props.players === 4) {
            return(
                <div>
                <NameInput text = {this.state.text[1]} onChange = {(number, text) => this.updatePlayer(number, text)} number = '1'/>
                <NameInput text = {this.state.text[2]} onChange = {(number, text) => this.updatePlayer(number, text)} number = '2'/>
                <NameInput text = {this.state.text[3]} onChange = {(number, text) => this.updatePlayer(number, text)} number = '3'/>
                <NameInput text = {this.state.text[4]} onChange = {(number, text) => this.updatePlayer(number, text)} number = '4'/>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
            {this.renderContent()}
            <button onClick = {this.props.whenClick}>
                START GAME
            </button>
            </div>
        );
    };
}

export default EntryInformation;