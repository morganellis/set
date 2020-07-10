import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function Landing() {
    return (
        <div className="landing-wrapper">

            <div className="landing-rules-wrapper">

                <h1 className="landing-rules-head">SET</h1>

                <h2 className="landing-rules-subhead">The Family Game of Visual Perception ®</h2>

                <p className="landing-rules-text">
                    Ages: 6 to adult <br /> Number of Players: 1 or more</p>
                <p className="landing-rules-info">
                    The object of the game is to identify a SET of 3 cards from 12 cards placed face up on the table. Each card has four features, which can vary as follows:</p>

                <div className="landing-example-container">
                    <img className="landing-example-sets" src="https://i.imgur.com/ig8P8Oy.png" alt="same: fill(striped); different color, number, and shape" />
                </div>

                <p className="landing-prompt">
                    Ready to play?
                </p>

                <div className="landing-butt-container">
                    <Link className="landing-login-butt" to="/login">Login</Link>

                    <Link className="landing-login-butt" to="/signup">Sign Up</Link>
                </div>

            </div>

        </div>
    )
}

export default Landing;

