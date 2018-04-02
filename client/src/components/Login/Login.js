import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const Login = (props) => (
    <div className="Login">
        <form onSubmit={(e) => {
          e.preventDefault();
          props.setCredentials(props.username, props.password);
        }
        }>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              //type="email"
              //value={props.username}
              onChange={props.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              //value={props.password}
              onChange={props.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            bsStyle="primary"
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