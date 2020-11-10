import React from 'react';
import Square from './Square';
import PlankSpace from './PlankSpace';

//property list
//squareSize: ie how big do we want individual squares to be?
//len: 9 in the usual case (how many squares!) - consider adding a default of len=9 somehow- must be odd!
//number of players

class Board extends React.Component {
    //there are 3 states for the planks to be! either inactive, hovered, active (maybe some neighbour hovered?)
    //there are 3 types of plank pieces: vertical, horizontal, inner - then we have a coordinate system for each
    //there are 2 states for the squares to be: inactive, hovered
    
    generateInitialConfig(type) {
        if (type==='squares') {
            const object = {};
            var i, j; //note: we can make this more dynamic by editing 10 here!
            for (i=1; i<this.props.len+1; i++) {
                for (j=1; j<this.props.len+1; j++) {
                    object[[i,j]] = 'inactive'
                }
            }
            return object
        }

        else if (type==='planks') {
            const object = {};
            const verticalObj  = {};
            const horizontalObj = {};
            const innerObj = {}; //necessary?
            var i, j;
            for (i=1; i<this.props.len; i++) {
                for (j=1; j<this.props.len; j++) {
                    innerObj[[i,j]] = 'inactive'
                }
            };
            object.inner = innerObj;

            for (i=1; i<this.props.len; i++) {
                verticalObj[[i,1]] = 'inactive'
                for (j=2; j<this.props.len; j=j+0.5) {
                    verticalObj[[i,j]] = 'inactive'
                }
                verticalObj[[i,this.props.len]] = 'inactive'

            }
            object.vertical = verticalObj;

            for (j=1; j<this.props.len; j++) {
                horizontalObj[[1,j]] = 'inactive'
                for (i=2; i<this.props.len; i=i+0.5) {
                    horizontalObj[[i, j]] = 'inactive'
                }
                horizontalObj[[this.props.len,j]] = 'inactive'
            }
            object.horizontal = horizontalObj;

            return object;
        }
    }

    state = {
            boardConfig : {squares : this.generateInitialConfig('squares'),
                        planks : this.generateInitialConfig('planks')},
            playerPosition : {
                1 : [(this.props.len+1)/2, this.props.len],
                2 : [(this.props.len+1)/2, 1],
                3 : this.props.numberOfPlayers === 2 ? null : [1, (this.props.len+1)/2],
                4: this.props.numberOfPlayers === 2 ? null : [this.props.len, (this.props.len+1)/2],
            },
            nextPlayertoMove : 1, //consider making this a random choice! and a random cycle of 4
            selectionOrientation: 'horizontal'
            }

    findNeighbours(typeOfElement, orientation, i, j) {
        if (typeOfElement === 'inner plank') {
            if (orientation === 'horizontal') {
                if (i===1) {
                    return [[1,j], [2, j], [2.5,j]]
                }
                else if (i===8) {
                    return [[8,j], [8.5, j], [9, j]]
                }
                else {
                    return [[i, j], [i+0.5, j], [i+1, j], [i+1.5]]
                }
            }
            else if (orientation === 'vertical') {
                if (j===1) {
                    return [[i, 1], [i, 2], [i, 2.5]]
                }
                else if (j===8) {
                    return [[i, 8], [i, 8.5], [i, 9]]
                }
                else {
                    return [[i, j], [i+0.5, j], [i+1, j], [i+1.5, j]]
                }
            }

        }
        else if (typeOfElement === 'horizontal plank') {
            if (j===1 || j=== 2) {
                return [[i, 1], [i, 2], [i, 2.5]]
            }
            else if (j===8.5 || j===9) {
                return [[i, 8], [i, 8.5], [i, 9]]
            }
            else {
                if (j % 1 === 0) {
                    return [[i, j-1], [i, j-0.5], [i, j], [i, j+0.5]]
                }
                else {
                    return [[i, j-0.5], [i, j], [i, j+0.5], [i, j+1]]
                }
            }
        }
        else if (typeOfElement === 'vertical plank') {
            if (i===1 || i===2) {
                return [[1, j], [2, j], [2.5, j]]
            }
            else if (i===8.5 || i===9) {
                return [[8, j], [8.5, j], [9, j]]
            }
            else {
                if (i % 1 === 0) {
                    return [[i-1, j], [i-0.5, j], [i, j], [i+0.5, j]]
                }
                else {
                    return [[i-0.5, j], [i, j], [i+0.5, j], [i+1, j]]
                }
            }
        }
    }
    
    sendInformationFromHover(typeOfElement, position, hoverOrNot) {
        const stateText = hoverOrNot === 1 ? 'hovered' : 'inactive'
        
        if (typeOfElement === 'square') {
            const obj = this.state.boardConfig
            obj.squares[position] = stateText
            this.setState({boardConfig : obj})
            return "Complete"
        }
        const [i, j] = position;
        
        if (typeOfElement === 'vertical plank') {
            this.setState({selectionOrientation : 'vertical'})
            
        }
        else if (typeOfElement === 'horizontal plank') {
            this.setState({selectionOrientation : 'horizontal'})
        }
    
        const neighbours = this.findNeighbours(typeOfElement, this.state.selectionOrientation, i, j)
        var neighbour;
        for (neighbour in neighbours) {
            if (this.state.boardConfig.planks[this.state.selectionOrientation][neighbour] === 'active') {
                return "Complete"
            }
        } 
        //if I knew Javascript better there'd 100000% be a better way to do this!
        
        const obj = this.state.boardConfig
        //add a small thing here to see if LEGAL move!! then we can make this click!
        for (neighbour in neighbours) {
            obj.planks[this.state.selectionOrientation][neighbour] = stateText
        }
    }

    sendInformationFromClick(typeOfElement, position) {
        if (typeOfElement === 'inner plank') {

        }
        else if (typeOfElement === 'vertical plank') {

        }
        else if (typeOfElement === 'horizontal plank') {

        }
        else if (typeOfElement === 'square') {

        }
    }

    render() {
        return(
            
        )
    }

}


export default Board;