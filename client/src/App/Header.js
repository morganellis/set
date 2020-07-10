import React from "react";
import Nav from "./Nav.js";

function Header() {
    return (
        <div className="header-wrapper">
            <h1 className="header-title">SET</h1>
            <Nav />
            {/* <img className="header-title" src="https://i.imgur.com/RzQneYD.png" alt="title"/> */}
        </div>
    )
}

export default Header;