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
        <a href="/" className="navbar-brand">
          StirUp
        </a>
        <Link 
        to={{ 
        pathname: '/bar', 
        state: props.username 
        }}>Bar</Link>
        <a href="/bar" className="navbar-brand">
          Bar
        </a>
        <a href="/trophies" className="navbar-brand">
          Badges
        </a>
      </div>
    </div>
  </nav>
);

export default Nav;