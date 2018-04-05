import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';
import "./Trophy.css";

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
        alt="Drink Image"
        src={props.drinkData.drinkImage}
        />
        </a>
    </Panel.Body>
  </Panel>
    </div>
);
export default Trophy;