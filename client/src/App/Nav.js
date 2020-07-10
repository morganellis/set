import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../redux/auth.js";

function Nav(props) {
    const isAuthenticated = props.isAuthenticated;
    return (
        <nav>
            {isAuthenticated ? "" : <div className="nav-link"><Link to="/"></Link></div>}

            {isAuthenticated ? "" : <div className="nav-link" title="Sign In"><Link to="/login"><i className="fa fa-sign-in"></i></Link></div>}

            {isAuthenticated ? "" : <div className="nav-link" title="Sign Up"><Link to="/signup"><i className="fa fa-user-plus"></i></Link></div>}


            {isAuthenticated ? <div className="nav-link" title="Home"><Link to="/home"><i className="fa fa-home"></i></Link></div> : ""}

            {isAuthenticated ? <div className="nav-link" title="Play"><Link to="/game"><i className="fa fa-play"></i></Link></div> : ""}

            <div className="nav-link" title="How to Play"><Link to="/rules/"><i className="fa fa-question"></i></Link></div>
            {isAuthenticated ? <div className="nav-link logout" title="Log Out"><Link to="/login" onClick={props.logout} ><i className="fa fa-sign-out"></i></Link></div> : ""}
        </nav>
    )
}

export default connect(state => state.user, { logout })(Nav);  