import React from "react";
import { Link } from 'react-router-dom';
import "./Nav.css";

const Nav = (props) => (
  <nav className="navbar navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <div className="navbar-brand">
          StirUp
        </div>
        <Link to="/bar" className="navbar-brand">
          BAR
        </Link>
        <Link to="/trophies" className="navbar-brand">
          BADGES
        </Link>
        {props.isAuthenticated?
        <Link to="/" onClick={props.logout} id="logout" className="navbar-brand">LOGOUT</Link>:
        null
        }
      </div>
    </div>
  </nav>
);

export default Nav;