import React, { Component } from 'react'


class Game extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        player1: 1,
        player2: 2,
        activePlayer: null,
        board: [],
        gameOver: false,
        testMessage: ''
        };
        
        // Bind play function to App component
        this.playerTurn = this.playerTurn.bind(this);
    }
    
    // refreshes the slots of the game board
    // create arrays in array that makes a 6x7 grid
    cleanBoard() {
        let board = [];
        for (let r = 0; r < 6; r++) {
        let row = [];
        for (let c = 0; c < 7; c++) { row.push(null) }
        board.push(row);
        }
        this.setState({
        board,
        activePlayer: this.state.player1,
        });
    }
    
    altPlayer() {
        const { activePlayer, player1, player2 } = this.state

        if(activePlayer === player1){
            return (
                player2
            )
        } else {
            return (
                player1 
            )
        }
    }
    
    
    
    checkVertical(board) {
        // Check only if row is 3 or greater
        for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c]) {
            if (board[r][c] === board[r - 1][c] &&
                board[r][c] === board[r - 2][c] &&
                board[r][c] === board[r - 3][c]) {
                return board[r][c];    
            }
            }
        }
        }
    }

    checkDiagonalLeft(board) {
        // Check only if row is 3 or greater AND column is 3 or greater
        for (let r = 3; r < 6; r++) {
        for (let c = 3; c < 7; c++) {
            if (board[r][c]) {
            if (board[r][c] === board[r - 1][c - 1] &&
                board[r][c] === board[r - 2][c - 2] &&
                board[r][c] === board[r - 3][c - 3]) {
                return board[r][c];
            }
            }
        }
        }
    }
    
    checkDiagonalRight(board) {
        // Check only if row is 3 or greater AND column is 3 or less
        for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
            if (board[r][c] === board[r - 1][c + 1] &&
                board[r][c] === board[r - 2][c + 2] &&
                board[r][c] === board[r - 3][c + 3]) {
                return board[r][c];
            }
            }
        }
        }
    }
    
    checkHorizontal(board) {
        // Check only if column is 3 or less
        for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
            if (board[r][c] === board[r][c + 1] && 
                board[r][c] === board[r][c + 2] &&
                board[r][c] === board[r][c + 3]) {
                return board[r][c];
            }
            }
        }
        }
    }
    
    checkDraw(board) {
        for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c] === null) {
            return null;
            }
        }
        }
        return 'draw';    
    }
    
    checkVictory(board) {
        return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
    }
    
    playerTurn(c) {
        const { activePlayer, player1, player2, gameOver} = this.state
        if (!gameOver) {
        // Create a game pieace onto the board
        let board = this.state.board;
        for (let r = 5; r >= 0; r--) {
            if (!board[r][c]) {
            board[r][c] = activePlayer;
            break;
            }
        }
        // Check status on the game board
        let result = this.checkVictory(board);
        if (result === player1) {
            this.setState({ board, gameOver: true, textMessage: "Player 1 is victorious!" });
        } else if (result === player2) {
            this.setState({ board, gameOver: true, textMessage: "Player 2 is victorious!" });
        } else if (result === 'draw') {
            this.setState({ board, gameOver: true, textMessage: "Noone won its a draw click New game to play again." });
        } else {
            this.setState({ board, activePlayer: this.altPlayer() });
        }
        } else {
        this.setState({ textMessage: "Game over. Please click New game to play again." });
        }
    }

    componentWillMount() {
        this.cleanBoard();
    }
    
    render() {
        return (
        <div>            
            <div className={"gameTitle"}>
                <h1 className={"title1"}>Connect-</h1><h1 className={"title2"}>Four</h1><h1 className={"title3"}>-Game</h1>
            </div>
            
            
                <p className="message">{this.state.textMessage}</p>
            <table>
            <thead>
            </thead>
            <tbody>
                {this.state.board.map((row, i) => (<Square key={i} row={row} playerTurn={this.playerTurn} />))}
                
            </tbody>
            </table>
            <div className="button" onClick={() => {this.cleanBoard()}}>New Game</div>
        </div>
        );
    }
}

const Square = ({ row, playerTurn }) => {
    return (
        <tr>
        {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} playerTurn={playerTurn} />)}
        </tr>
    );
    };
    
    const Cell = ({ value, columnIndex, playerTurn }) => {  
    let color = 'white';
    if (value === 1) {
        color = 'blue';
    } else if (value === 2) {
        color = 'green';
    }
        
    return (
        <>
        <td>
        <div className="cell" onClick={() => {playerTurn(columnIndex)}}>
            <div className={color}></div>
        </div>
        </td>
        </>
    );
    };

export default Game
