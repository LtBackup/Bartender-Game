import React from "react";
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import "./Login.css"

/**
* Creates a login form that passes username and password entries to the state and triggers database
* calls to validate or create users
*
* @param {object} that contains all the passed down properties
* 
* @returns a login form to the page
*/
const Login = (props) => (
    <div className="Login">
        <form onSubmit={(e) => {
          e.preventDefault();
          props.handleLogin(props.username, props.password);
        }}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel className="subtitle">Username</ControlLabel>
            <FormControl
              autoFocus
              onChange={props.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel className="subtitle">Password</ControlLabel>
            <FormControl
              onChange={props.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            id="submit"
            block
            bsSize="large"
            disabled={!props.validateForm}
            type="submit"
          >
            Login
          </Button>
          <div id="warning">
          {props.badCreds? "Incorrect login credentials. Try again.":""}
          </div>
        </form>
      </div>
);
export default Login;