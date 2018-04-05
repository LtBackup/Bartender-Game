import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import "./Login.css"

const Login = (props) => (
    <div className="Login">
        <form onSubmit={(e) => {
          e.preventDefault();
          // props.setCredentials(props.username, props.password);
          props.handleLogin(props.username, props.password);
        }}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel className="subtitle">Username</ControlLabel>
            <FormControl
              autoFocus
              //type="email"
              //value={props.username}
              onChange={props.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel className="subtitle">Password</ControlLabel>
            <FormControl
              //value={props.password}
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
        </form>
      </div>
);
export default Login;