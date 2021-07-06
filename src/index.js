import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import judgeWinner from './judge.js'

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = [[0,1,2],[3,4,5],[6,7,8]];
    const squaresMap = squares.map((rows, index) => {
      return (
        <div className="board-row" key={index}>
          {rows.map((row, i) => {
            return this.renderSquare(row)
          })}
        </div>
      )
    })

    return (
      <div>
        {squaresMap}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props, ctx) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // copy state
    if (squares[i] || judgeWinner(squares)) {
      return;
    }
    squares[i] = this.state.xIsNext ? '❌' : '⭕️';
    this.setState({
      history: history.concat([{
        squares,
        position: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      // history: this.state.history.slice(0, step + 1),
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  render() {
    const history = this.state.history;
    
    let moves = history.map(({position}, move) => {
      const desc = move
      ? `Go to move #${move}(${Math.floor(position / 3)}, ${position % 3})`
      : 'Go to game start';
      return (
        <li key={move} style={{ fontWeight: (this.state.stepNumber === move) ? 600 : 500 }}>
          <button
            style={{ fontWeight: (this.state.stepNumber === move) ? 600 : 500 }}
            onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })
    
    const current = history[this.state.stepNumber];
    const winner = judgeWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else  {
      status = `Next player: ${this.state.xIsNext ? '❌' : '⭕️'}`;
    }

    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
