import React from 'react';
import EntryInformation from './EntryInformation';
import PlayerSelector from './PlayerSelector';

class EntryScreen extends React.Component {
    
    render() {
        return(
            <div>
                <div className = "logo"><img/></div>
                <div className = "player selector">
                    <PlayerSelector players = {this.props.players} whenTwo = {this.props.whenTwo} whenFour = {this.props.whenFour}/>
                </div>
                <div className = "entry information">
                    <EntryInformation whenClick = {this.props.whenClick} players = {this.props.players}/>
                </div>
            </div>
        )
    }

    
}

export default EntryScreen;