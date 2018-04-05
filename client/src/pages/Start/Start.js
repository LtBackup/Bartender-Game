import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Row, Grid } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import './Start.css';
 

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
        existingUser: true,
        badCreds: this.props.badCreds,
        isAuthenticated: "",
        username: "",
        password: ""
    };
  }


    /**
    * This function toggles the setting that determines whether the user should be shown the login or sign up panel
    * also calls the app function that resets the badCreds variable to remove persistent error messages
    * @param {event} the button press event that switches the panes
    * 
    * @returns void
    */
    toggleExisting = (event) => {
        event.preventDefault();
        this.setState({ existingUser: !this.state.existingUser});
        this.props.toggleBadCreds();
    }

    /**
    * Determines if the username and password are long enough to enable a form submit
    * 
    * @returns {boolean}
    */
    validateForm() {
      return this.state.username.length > 4 && this.state.password.length > 4;
    }

    /**
    * relays changes to a form to a corresponding variable in this.state
    * @param {event} the form change event
    * 
    * @returns void
    */
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value.trim()
      });
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Jumbotron>
                        <h1>Let's Mix it Up!</h1>
                        <h2>{this.state.existingUser? 
                        "Log In:":
                        "Create New Account:"}
                        </h2>
                        {this.state.existingUser?
                        <Login toggle={this.toggleExisting}
                        validateForm={this.validateForm}
                        handleChange={this.handleChange}
                        handleLogin={this.props.handleLogin}
                        username={this.state.username}
                        password={this.state.password}
                        setCredentials={this.props.setCredentials}
                        badCreds={this.props.badCreds}
                        /> :
                        <SignUp toggle={this.toggleExisting}
                        validateForm={this.validateForm}
                        handleChange={this.handleChange}
                        handleNew={this.props.handleNew}
                        username={this.state.username}
                        password={this.state.password}
                        setCredentials={this.props.setCredentials}
                        badCreds={this.props.badCreds}
                        />}
                        <Button onClick={this.toggleExisting}>
                        {this.state.existingUser? 
                        "Click here to create a new account":
                        "Click here to use an existing account"}
                        </Button>
                     </Jumbotron>
                </Row>
            </Grid>
        );
    }
}

export default Start;
