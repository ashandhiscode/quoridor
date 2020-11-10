import React from 'react';
import './PlankSpace.css';

//properties: TYPE (orientation)
//activeOrNot (ie is it being hovered over?)
class PlankSpace extends React.Component {

    render() {
        return(
            <div 
                className = {`${this.props.orientation} plank  ${this.props.activeOrNot}`}
                onMouseEnter = {()=>this.props.onHover(`${this.props.orientation} plank`, [this.props.x, this.props.y], 1)}
                onMouseLeave = {()=>this.props.onHover(`${this.props.orientation} plank`, [this.props.x, this.props.y], 0)}>Hello
            </div>
        )
    }

}

export default PlankSpace;