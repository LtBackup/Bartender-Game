import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const SignUp = (props) => (
    <div className="Login">
        <form onSubmit={(e) => {
          e.preventDefault();
          //props.setCredentials(props.username, props.password);
          props.handleNew(props.username, props.password);
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
            Sign Up!
          </Button>
        </form>
      </div>
);
export default SignUp;