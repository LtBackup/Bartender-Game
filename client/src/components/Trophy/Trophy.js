import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';

const Trophy = (props) => (
    <Panel bsStyle="info">
        <Panel.Heading>
            <Panel.Title componentClass="h3">{props.drinkName}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>Details</Panel.Body>
    </Panel>
);
export default Trophy;