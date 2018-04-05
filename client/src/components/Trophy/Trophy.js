import React from "react";
import { Panel } from 'react-bootstrap';
import "./Trophy.css";

/**
  * Creates a panel with drink photo and link to the drink page
*
* @param {object} that contains all the passed down properties
* 
* @returns a panel to the page
*/
const Trophy = (props) => (
    <div className="badge">
    <Panel>
    <Panel.Heading bsStyle="info">
      <Panel.Title componentClass="h3" className="drinkTitle">{props.drinkData.drinkName}</Panel.Title>
    </Panel.Heading>
    <Panel.Body className="drinkContent">
    <a href={props.drinkData.drinkLink} target="_blank">
    <img
      className="drinkPic"
        alt="Drink"
        src={props.drinkData.drinkImage}
        />
        </a>
    </Panel.Body>
  </Panel>
    </div>
);
export default Trophy;