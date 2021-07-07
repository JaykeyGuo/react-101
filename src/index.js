import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import judgeWinner from "./judge.js";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.style}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSquare(i, isHighlight = false) {
    console.log(i, isHighlight);
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        style={{ background: isHighlight ? "lightblue" : "" }}
      />
    );
  }

  render() {
    const squares = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    const squaresMap = squares.map((rows, index) => {
      return (
        <div className="board-row" key={index}>
          {rows.map((row) => {
            return this.renderSquare(
              row,
              this.props.winner && this.props.winner.includes(row)
            );
          })}
        </div>
      );
    });

    return <div>{squaresMap}</div>;
  }
}

class Moves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReverseMove: false,
    };
  }

  jumpTo(step) {
    this.props.handleJump(step);
  }

  reverseMove() {
    this.setState({
      isReverseMove: !this.state.isReverseMove,
    });
  }

  renderMoves() {
    const history = this.props.history;

    let moves = history.map(({ position }, move) => {
      const desc = move
        ? `Go to move #${move}(${Math.floor(position / 3)}, ${position % 3})`
        : "Go to game start";
      return (
        <li
          key={move}
          style={{ fontWeight: this.props.stepNumber === move ? 600 : 500 }}
        >
          <button
            style={{ fontWeight: this.props.stepNumber === move ? 600 : 500 }}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    this.state.isReverseMove && (moves = moves.reverse());
    return moves;
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.reverseMove()}>Reverse</button>
        </div>
        {/* <div>{moves}</div> */}
        <div>{this.renderMoves()}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props, ctx) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };

    // this.jumpTo = this.jumpTo.bind(this)
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // copy state
    if (squares[i] || judgeWinner(squares)) {
      return;
    }
    squares[i] = this.state.xIsNext ? "❌" : "⭕️";
    this.setState({
      history: history.concat([
        {
          squares,
          position: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // 使用箭头函数处理 this 的绑定问题
  jumpTo = (step) => {
    console.log(step, this);
    this.setState({
      // history: this.state.history.slice(0, step + 1),
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  render() {
    const history = this.state.history;

    const current = history[this.state.stepNumber];
    const winner = judgeWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status =
        this.state.stepNumber === 9
          ? "Love and Peace"
          : `Next player: ${this.state.xIsNext ? "❌" : "⭕️"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {/* <ol>{moves}</ol> */}
          <ol>
            <Moves
              history={this.state.history}
              stepNumber={this.state.stepNumber}
              handleJump={this.jumpTo}
            />
          </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
