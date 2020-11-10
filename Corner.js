import React from 'react';
import './Corner.css';

const Corner = (props) => {
        return(
            <div 
                className = "corner"
                onMouseEnter = {() => props.whenMouse("enters", 'corners', props.selectionOrientation, parseInt(props.colNumber, 10), parseInt(props.rowNumber, 10))}
                onMouseLeave = {() => props.whenMouse("leaves", 'corners', props.selectionOrientation, parseInt(props.colNumber, 10), parseInt(props.rowNumber, 10))}
                onClick = {() => props.whenMouse("clicks", 'corners', props.selectionOrientation, parseInt(props.colNumber, 10), parseInt(props.rowNumber, 10))}
            >
            </div>
        )
}

export default Corner;