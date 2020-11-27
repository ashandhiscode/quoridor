import React from 'react';
import Plank from './Plank';
import Square from './Square';
import Corner from './Corner';
import './Row.css';

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"]

//note: type: square
class Row extends React.Component {

    renderContent() {
        if (this.props.type === 'squares') {
            return(
                <div className = 'squares-container'>
                    {numbers.map(number => (
                        <div className = "container">
                            <Square 
                                rowNumber = {this.props.rowNumber} 
                                colNumber = {number} 
                                data = {this.props.data}
                                whenMouse = {this.props.whenMouse}
                            />
                            <Plank 
                                orientation = "vertical" 
                                split = {this.props.rowNumber === "1"||this.props.rowNumber==="9" ? "full" : "half"}
                                rowNumber = {this.props.rowNumber}
                                colNumber = {number}
                                data = {this.props.data}
                                selectionOrientation = {this.props.selectionOrientation}
                                whenMouse = {this.props.whenMouse}
                            />
                        </div>
                    ))}
                    <div className = "container">
                    <Square
                        rowNumber = {this.props.rowNumber}
                        colNumber = "9"
                        data = {this.props.data}
                        whenMouse = {this.props.whenMouse}
                    />
                    </div>
                </div>
            )
        }
        else if (this.props.type === 'planks') {
            return(
                <div className = 'planks-container'>
                    {numbers.map(number => (
                        <div className = "container">
                            <Plank 
                                orientation = "horizontal" 
                                split = {number === "1" ? "full" : "half"}
                                rowNumber = {this.props.rowNumber}
                                colNumber = {number}
                                data = {this.props.data}
                                selectionOrientation = {this.props.selectionOrientation}
                                whenMouse = {this.props.whenMouse}
                            />
                            <Corner
                                rowNumber = {this.props.rowNumber}
                                colNumber = {number}
                                data = {this.props.data}
                                selectionOrientation = {this.props.selectionOrientation}
                                whenMouse = {this.props.whenMouse}
                            />
                        </div>
                    ))}
                    <div className = "container">
                        <Plank 
                            orientation = "horizontal" 
                            split = "full"
                            rowNumber = {this.props.rowNumber}
                            colNumber = "9"
                            data = {this.props.data}
                            selectionOrientation = {this.props.selectionOrientation}
                            whenMouse = {this.props.whenMouse}
                        />
                    </div>
                </div>
            )
        }
    }

    render() {
        return(
            <div className = "row-container">
                {this.renderContent()}
            </div>
        )
    }
}

export default Row;