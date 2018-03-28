import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const Login = (props) => (
    <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={props.email}
              onChange={props.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={props.password}
              onChange={props.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
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