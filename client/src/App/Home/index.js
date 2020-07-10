import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
const scoresAxios = axios.create();

scoresAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    // console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

class Home extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            scores: [],
            errMsg: "",
            loading: true
        }
    }

    componentDidMount = () => {
        scoresAxios.get(`/api/scores/`)
            .then(response => {
                // console.log(response.data);
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
            })
    }


    render = () => {
        // console.log(this.props);
        const { isAuthenticated } = this.props;
        const { scores, errMsg, loading } = this.state;
        const presentScores = scores.sort((scoreOne, scoreTwo) =>
            scoreTwo.bestScore - scoreOne.bestScore).map((player, i) =>
                <li
                    key={player._id + i} className="one-score">
                    <p className="player">
                        {player.name} {!player.avatar ? "" : <img className="smallAvatar" src={player.avatar} alt="Player Avatar" />}</p>
                    <p className="best-score"> Sets: <span>{player.bestScore}</span></p>
                </li>
            );

        if (loading) {
            return (
                <div className="profile-wrapper">
                    <h1 style={{ color: "black" }}>... Loading Scores</h1>
                </div>
            )
        } else if (errMsg) {
            return <p>Sorry, data is not availble right now.</p>
        } else if (scores.length === 0) {
            return (
                <div>
                    No Scores Available
                </div>
            )
        } else {
            return (
                <div className="profile-wrapper">
                    <div className="welcome">
                        <h2>Hello {isAuthenticated ? <Link className="userName" to="/profile">{this.props.name}</Link> : ""}, wanna compete?</h2>
                    </div>
                    <div className="scores-wrapper" >
                        <div className="scores-container">
                            <div className="top-title">Leaderboard:</div>
                            <ol className="scores-list">
                                {presentScores}
                            </ol>
                        </div>
                    </div>
                </div>)
        }
    }
}

export default connect(state => state.user, {})(Home);
