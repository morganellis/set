import React, { useState } from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/auth.js";
import "./header.css";

function Header(props) {
  const [state, setState] = useState({ menuOpen: false })
  const isAuthenticated = props.isAuthenticated;

  function toggleMenu() {
    $(".menu-container").slideToggle("fast", function () {
      setState(prevState => { return { menuOpen: !state.menuOpen } });
    });
  };

  function handleLogout(e) {
    $(".menu-container").slideToggle("fast", function () {
      setState(prevState => { return { menuOpen: !state.menuOpen } });
    });
    props.logout();
  };

  return (
    <div className="hdr-wrap">
      <div className="mobile-menu-wrap">
        <p className="title">SET</p>

        {state.menuOpen ? <i className="menu-icon fa fa-times" onClick={toggleMenu}></i> : <i className="menu-icon fa fa-bars" onClick={toggleMenu}></i>}
        {/* {state.menuOpen ? <p className="close-menu menu-icon" onClick={toggleMenu}>×</p> : <i className="menu-icon fa fa-bars" onClick={toggleMenu}></i> } */}

        <div className="menu-container hide" id="menuContainer">
          {isAuthenticated ? "" : <div className="mobile-link link" title="Sign In"><Link to="/login" onClick={toggleMenu}>Login</Link></div>}

          {isAuthenticated ? "" : <div className="mobile-link link" title="Sign Up"><Link to="/signup" onClick={toggleMenu}>Sign Up</Link></div>}

          {isAuthenticated ? <div className="mobile-link link" title="Home"><Link to="/home" onClick={toggleMenu}>Home</Link></div> : ""}

          {isAuthenticated ? <div className="mobile-link link" title="Play"><Link to="/play" onClick={toggleMenu}>Play</Link></div> : ""}

          <div className="mobile-link link" title="How to Play"><Link to="/instructions/" onClick={toggleMenu}>How to Play</Link></div>

          <div className="mobile-link link" title="My Account"><Link to="/profile/" onClick={toggleMenu}>My Account</Link></div>

          {isAuthenticated ? <div className="mobile-link link" title="Log Out"><Link to="/login" onClick={handleLogout}>Log Out</Link></div> : ""}
        </div>
      </div>

      <div className="desktop-menu-wrap">
        {isAuthenticated ? "" : <div className="link" title="Sign In"><Link to="/login">Login</Link></div>}

        {isAuthenticated ? "" : <div className="link" title="Sign Up"><Link to="/signup">Sign Up</Link></div>}

        {isAuthenticated ? <div className="link" title="Home"><Link to="/home">Home</Link></div> : ""}

        {isAuthenticated ? <div className="link" title="Play"><Link to="/play">Play</Link></div> : ""}

        <div className="link" title="How to Play"><Link to="/instructions/">How to Play</Link></div>

        <div className="link" title="My Account"><Link to="/profile/">My Account</Link></div>

        {isAuthenticated ? <div className="link" title="Log Out"><Link to="/login" onClick={props.logout} >Log Out</Link></div> : ""}
      </div>
    </div>
  )
}

export default connect(state => state.user, { logout })(Header);  