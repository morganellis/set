import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./home.css";

const scoresAxios = axios.create();

scoresAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      errMsg: "",
      loading: true
    };
  };

  componentDidMount = () => {
    scoresAxios.get(`/api/scores/`)
      .then(response => {
        const { data } = response;
        this.setState({
          scores: data.user,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          errMsg: err.message
        })
      });
  };

  render = () => {
    const { isAuthenticated } = this.props;
    const { scores, errMsg, loading } = this.state;

    const presentScores = scores.sort((scoreOne, scoreTwo) => scoreTwo.bestScore - scoreOne.bestScore).map((player, i) =>
      <li key={player._id + i} className="player-score-container">
        <div className="home-row">
          <div className="home-col">
            <p className="leaderboard-txt para">{player.name} </p>
            <p className="leaderboard-txt para"> Sets: <span>{player.bestScore}</span></p>
          </div>
          <div className="col">
            {!player.avatar ? "" : <div className="avatar-wrap"><img className="avatar" src={player.avatar} alt={player.name} /></div>}
          </div>
        </div>
      </li>
    );

    if (loading) {
      return (
        <div className="home wrap">
          <h1 style={{ color: "black" }}>Loading...</h1>
        </div>
      )
    } else if (errMsg) {
      return <p>Sorry, data is not availble right now.</p>
    } else if (scores.length === 0) {
      return (<div>No Scores Available</div>)
    } else {
      return (
        <div className="home wrap">
          <p className="hdr">Welcome back, {this.props.name}!</p>
          {isAuthenticated ? <Link className="play-btn" to="/play"><button className="btn">Let's Play!</button></Link> : ""}

          <p className="title">LEADERBOARD</p>
          <ol className="list">
            {presentScores}
          </ol>
        </div>)
    }
  }
};

export default connect(state => state.user, {})(Home);