import React from 'react';
import EntryScreen from './EntryScreen';

class App extends React.Component {

    state = {ready : 'False', players : 2, player_names : {1 : null, 2 : null, 3: null, 4:null}}

    finalisePlayerNames = (object) => {
        this.setState({player_names : object})
        this.setState({ready : 'True'})
    }

    twoPlayers = () => {
        this.setState({players: 2})
    } 

    fourPlayers = () => {
        this.setState({players : 4})
    }

    render() {
        return (
            <div>
                <EntryScreen 
                    players = {this.state.players} 
                    whenTwo = {this.twoPlayers} 
                    whenFour = {this.fourPlayers}
                    whenClick = {this.finalisePlayerNames}
                />
            </div>
        )
    }
}

export default App;