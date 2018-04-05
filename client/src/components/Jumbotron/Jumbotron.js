import React from "react";
import "./Jumbotron.css";

/**
* Creates a Jumbotron
*
* @param {object} that contains all the passed down properties
* 
* @returns a jumbotron form to the page
*/
const Jumbotron = ({ children }) => (
  <div style={{ clear: "both" }} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
