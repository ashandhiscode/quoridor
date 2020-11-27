import React from 'react';
import './Square.css'

class Square extends React.Component {

    render() {
        return(
            <div 
                className = {`square ${this.props.data.squares[[this.props.colNumber, this.props.rowNumber]]}`}
                onMouseEnter = {() => this.props.whenMouse("enters", 'squares', null, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10))}
                onMouseLeave = {() => this.props.whenMouse("leaves", 'squares', null, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10))}
                onClick = {() => this.props.whenMouse("clicks", 'squares', null, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10))}
            >
            {this.props.children}
            </div>
        )
    }


}

export default Square;