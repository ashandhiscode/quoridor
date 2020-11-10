import React from 'react';
import './Plank.css';

//props: 
//orientation: vertical, horizontal
//split: half, full
class Plank extends React.Component {
    
    renderContent() {
        if (this.props.split === 'half') {
            return (
                <div className = {`${this.props.orientation}-container`}>
                <div 
                    className = {`${this.props.orientation}-half plank ${this.props.data.planks[this.props.orientation][[this.props.colNumber, this.props.rowNumber]]}`}
                    onMouseEnter = {() => this.props.whenMouse("enters", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10), "first")}
                    onMouseLeave = {() => this.props.whenMouse("leaves", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10), "first")}
                    onClick = {() => this.props.whenMouse("clicks", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10), "first")}
                >
                </div>
                <div 
                    className = {`${this.props.orientation}-half plank ${this.props.data.planks[this.props.orientation][[this.props.colNumber, this.props.rowNumber]]}`}
                    onMouseEnter = {() => this.props.whenMouse("enters", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10), "last")}
                    onMouseLeave =  {() => this.props.whenMouse("leaves", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10), "last")}
                    onClick = {() => this.props.whenMouse("clicks", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10), "last")}
                >
                </div>
                </div>
            )
        }
        else if (this.props.split === 'full') {
            return (
                <div className = {`${this.props.orientation}-container`}>
                <div 
                    className = {`${this.props.orientation}-full plank ${this.props.data.planks[this.props.orientation][[this.props.colNumber, this.props.rowNumber]]}`}
                    onMouseEnter = {() => this.props.whenMouse("enters", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10))}
                    onMouseLeave = {() => this.props.whenMouse("leaves", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10))}
                    onClick = {() => this.props.whenMouse("clicks", "planks", this.props.orientation, parseInt(this.props.colNumber, 10), parseInt(this.props.rowNumber, 10))}
                >
                </div>
                </div>
            )
        }
    }


    render() {
        return(
            this.renderContent()
        )
    }
}

export default Plank;