import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const SignUp = (props) => (
    <div className="Login">
        <form onSubmit={props.handleNew}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              onChange={props.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
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
            Sign Up!
          </Button>
        </form>
      </div>
);
export default SignUp;