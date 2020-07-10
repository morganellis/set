import React, { Component } from "react";

import "./style.css";

const formatSec = (sec) =>
  Math.floor(sec / 60) +
  ':' +
  ('0' + sec % 60).slice(-2)


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secsPast: 0,
      lastIncrementer: null,
      sets: 0
    };
    this.incrementer = null;
    this.startClick = this.startClick.bind(this);
    this.pauseClick = this.pauseClick.bind(this);
    this.newGameClick = this.newGameClick.bind(this);
  }

  startClick() {
    this.incrementer = setInterval(() =>
      this.setState({
        secsPast: this.state.secsPast + 1
      })
      , 1000);
    this.props.dealingCards();
  }

  restartTmer = () => {
    this.incrementer = setInterval(() =>
      this.setState({
        secsPast: this.state.secsPast + 1
      })
      , 1000);
    this.props.showDeckAfterPause();
  }

  pauseClick = () => {
    clearInterval(this.incrementer);
    this.setState({
      lastIncrementer: this.incrementer
    });
    this.props.pauseAndHideDeck();
  }

  newGameClick() {
    clearInterval(this.incrementer);
    this.setState(prevState => {
      return {
        secsPast: 0,
        sets: 0
      }
    });
    this.props.endGame();
    this.startClick();
    this.props.showDeckAfterPause();
  }

  finishGameClick = () => {
    clearInterval(this.incrementer);
    this.setState({
      secsPast: 0,
      sets: 0
    });
    this.props.changeBestScoreUser();
    this.props.endGame();
  }

  render() {
    return (
      <div className="timer-container">
        <h1>{formatSec(this.state.secsPast)}</h1>

        <div className="butts-container">


          {(this.state.secsPast !== 0 &&
            this.incrementer === this.state.lastIncrementer
            ?
            <div className="game-butts">
              <button className="start-game resume" onClick={this.restartTmer}>RESUME</button>
              <button className="new-game" onClick={this.newGameClick}>NEW GAME</button>
            </div>
            : null
          )}
          {(!this.props.gameOn
            ? <button className="start-game centerButton" onClick={this.startClick}>START</button>
            : ""
          )}
          {this.props.hideDeck || !this.props.gameOn ? "" :
            <button className="pause-game" onClick={this.pauseClick}>II</button>}
          {this.props.cardsAvailable === 0 || this.props.hideDeck || !this.props.gameOn
            ? "" :
            <button className="replace-cards" onClick={this.props.addCards}>REPLACE 3 CARDS</button>}
          {!this.props.gameOn ? "" :
            <button className="end-game" onClick={this.finishGameClick}>END GAME & SAVE</button>}
        </div>
      </div>

    );
  }
}