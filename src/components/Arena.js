import React from 'react';
import Row from './Row';
import './Arena.css';
import { findAllByTestId } from '@testing-library/react';

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"]


//props:
//playerNames: {1: "", 2: "", 3: "", 4: ""}
class Arena extends React.Component {

    
    state = {
        playerConfig : this.generatePlayerConfig(), //how much fences everyone has, whose turn it is...
        boardConfig : this.generateBoardConfig(Object.values(this.props.playerNames).length), 
        selectionOrientation : "horizontal", 
        currentPlayer: 1
    }

    generatePlayerConfig() {
        const playerConfig = {}
        const array = Object.keys(this.props.playerNames)
        const posArray = array.length === 2 ? [[5,1], [5,9]] : [[5,1], [1,5], [5,9], [9,5]]
        var index;
        for (index=0;index<array.length; index++) {
            playerConfig[array[index]] = {fenceCount: 10, currentPosition : posArray[index]}
        }
        return playerConfig
    }

    generateBoardConfig(numberOfPlayers) {
        const boardConfig = {}
        const tempObj = {}
        const tempObj2 = {}
        const tempObj3 = {}
        var x, y;
    
        for (x=1;x<10;x++) {
            for (y=1;y<10;y++) {
                if (numberOfPlayers === 2) {
                    if (x===5 && (y===1 || y===9)) {
                        tempObj[[x,y]] = `active-square${y===1 ? "1" : "2"}`
                        continue;
                    }
                }
                else if (numberOfPlayers === 4) {
                    if ((x===5 && (y===1 ||y===9)) || (y===5 && (x===1 ||x===9))) {
                        tempObj[[x,y]] = `active-square${x===5 ? (y===1 ? "1" : "3") : (x===1 ? "2" : "4")}`
                        continue;
                    }
                }    
                tempObj[[x,y]] = 'inactive-square'
            }
        }
        boardConfig.squares = tempObj
        
        for (x=1; x<9; x++) {
            for (y=1; y<10; y++) {
                tempObj2[[x,y]] = 'inactive-plank'
            }
        }
        for (y=1; y<9; y++) {
            for (x=1; x<10; x++) {
                tempObj3[[x,y]] = 'inactive-plank'
            }
        }
        boardConfig.planks = {vertical : tempObj2, horizontal : tempObj3}
        
        return boardConfig
    }

    findNeighbours = (type, orientation, colNumber, rowNumber, split) => {
        if (type === 'corners') {
            if (orientation === 'horizontal') {
                return [[colNumber, rowNumber], [colNumber+1, rowNumber]]
            }
            else if (orientation === 'vertical') {
                return [[colNumber, rowNumber], [colNumber, rowNumber+1]]
            }
        }
        else if (type === 'planks') {
            if (orientation === 'horizontal') {
                if (colNumber === 1) {
                    return [[1, rowNumber], [2, rowNumber]]
                }
                else if (colNumber === 9) {
                    return [[8, rowNumber], [9, rowNumber]]
                }
                else {
                    if (split === 'first') {
                        return [[colNumber-1, rowNumber], [colNumber, rowNumber]]
                    }
                    else if (split === 'last') {
                        return [[colNumber, rowNumber], [colNumber+1, rowNumber]]
                    }
                }
            }
            else if (orientation === 'vertical') {
                if (rowNumber === 1) {
                    return [[colNumber, 1], [colNumber, 2]]
                }
                else if (rowNumber === 9) {
                    return [[colNumber, 8], [colNumber, 9]]
                }
                else {
                    if (split === 'first') {
                        return [[colNumber, rowNumber-1], [colNumber, rowNumber]]
                    }
                    else if (split === 'last') {
                        return [[colNumber, rowNumber], [colNumber, rowNumber+1]]
                    }
                }
            }
        }
    }

    findPerpNeighbours(listOfPlanks, orientation) {
        const cornerCoord = listOfPlanks[0] //this is due to the way we've constructed this
        const colNumber = cornerCoord[0]
        const rowNumber = cornerCoord[1]
        return this.findNeighbours("corners", orientation, colNumber, rowNumber)
    }

    checkIfLegalMove(x_fut, y_fut) {
        //first let's find the coordinates of the current player
        const obj = this.state.boardConfig
        const pos = this.state.playerConfig[this.state.currentPlayer].currentPosition
        const x = pos[0]
        const y = pos[1]
        if (x_fut !== x && y_fut !== y) {
            return false
        }
        else {
            if (x_fut === x + 1 || x_fut === x - 1 || y_fut === y + 1 || y_fut === y - 1) {
                if (x_fut === x+1) { //ie we want to move right
                    if (obj.planks['vertical'][[x,y]] === 'active-plank') {
                        return false
                    }
                    else {
                        return true
                    }
                }
                else if (x_fut === x-1) { //ie we want to move left
                    if (obj.planks['vertical'][[x-1, y]] === 'active-plank') {
                        return false
                    }
                    else {
                        return true
                    }
                }   
                else if (y_fut === y+1) { //ie we want to move up
                    if (obj.planks['horizontal'][[x, y]] === 'active-plank') {
                        return false
                    }
                    else {
                        return true
                    }
                }
                else if (y_fut === y-1) { //ie we want to move down
                    if (obj.planks['horizontal'][[x,y-1]] === 'active-plank') {
                        return false
                    }
                    else {
                        return true
                    }
                }
            } 
            else {
                return false
            }
        }
    }

    checkForBlockages(additions) {
                
    }

    whenMouse = (event, type, orientation, colNumber, rowNumber, split) => {
        const obj = this.state.boardConfig
        const pos = this.state.playerConfig
        var stateText;
        
        if (event === "enters") {
            stateText = 'hover'
        }
        else if (event === "leaves") {
            stateText = `inactive-${type === 'squares' ? "square" : "plank"}`
        }
        else if (event === "clicks") {
            stateText = `active-${type === 'squares' ? `square${this.state.currentPlayer}` : 'plank'}`
        }
        
        if (type === 'squares') {
            if (obj[type][[colNumber, rowNumber]].slice(0,-1) === 'active-square') {
                return "Nevermind"
            }
            if (!this.checkIfLegalMove(colNumber, rowNumber)) {
                return "Illegal move"
            }
            if (event === "clicks") {
                //do some checks!! this is going to be a sort of "check it works"
                //assume now that we have passed and therefore we're going to clear the board ready to add
                var x,y;
                for (x=1;x<10;x++) {
                    for (y=1;y<10;y++) {
                        if (obj.squares[[x,y]] === `active-square${this.state.currentPlayer}`) {
                            obj.squares[[x,y]] = 'inactive-square'
                        }            
                    }
                }
                pos[this.state.currentPlayer].currentPosition = [colNumber, rowNumber]
                this.setState({playerConfig : pos})
            }
            obj[type][[colNumber, rowNumber]] = stateText
            this.setState({boardConfig : obj})
        }
        else {
            //update rotation if necessary
            if (type === 'planks') {
                this.setState({selectionOrientation : orientation})
            }

            const neighbours = this.findNeighbours(type, orientation, colNumber, rowNumber, split)
            const perpNeighbours = this.findPerpNeighbours(neighbours, orientation === "horizontal" ? "vertical" : "horizontal")
            const notActive = neighbour => obj.planks[orientation][neighbour] !== 'active-plank';
            const activePerp = neighbour => obj.planks[orientation === "horizontal" ? "vertical" : "horizontal"][neighbour] === 'active-plank'
            var index;
            //const updateObj = neighbour => obj.plank[orientation][neighbour] = stateText 
            if (neighbours.every(notActive) && !perpNeighbours.every(activePerp)) {
                if (this.checkForBlockages(neighbours)) {
                    return "This produces a block and therefore is an unavailable move"
                }
                for (index=0; index<neighbours.length; index++) {
                    obj.planks[orientation][neighbours[index]] = stateText
                }
                if (event === "clicks") {
                    //do some checks!!
                }
                this.setState({boardConfig: obj})
            }
            else {
                return "Not available"
            }
        }
        if (event === "clicks") {
            //also here let's remove a fence if necessary!
            if (type !== "squares") {
                pos[this.state.currentPlayer].fenceCount = pos[this.state.currentPlayer].fenceCount - 1
                this.setState({playerConfig : pos})
            }
            const n = this.state.currentPlayer + 1
            console.log([n, this.state.currentPlayer])
            this.setState({currentPlayer : n===5 ? 1 : n})
            console.log(this.state.currentPlayer)
            

        }
    }

    render() {
        return(
            <div className = "board">
                {numbers.map(number => (
                    <div>
                        <Row 
                            type = "squares" 
                            rowNumber = {number} 
                            data = {this.state.boardConfig}
                            selectionOrientation = {this.state.selectionOrientation}
                            whenMouse = {this.whenMouse}
                        />
                        <Row 
                            type = "planks" 
                            rowNumber = {number} 
                            data = {this.state.boardConfig}
                            selectionOrientation = {this.state.selectionOrientation}
                            whenMouse = {this.whenMouse}
                            
                        />  
                    </div>  
                ))}
                <Row 
                    type = "squares" 
                    rowNumber= "9" 
                    data = {this.state.boardConfig}
                    selectionOrientation = {this.state.selectionOrientation}
                    whenMouse = {this.whenMouse}
                />
            </div>
        )
    }
}

export default Arena;