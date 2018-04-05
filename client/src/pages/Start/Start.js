import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
// import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
//import { Input, TextArea, FormBtn } from "../../components/Form";
import { Col, Row, Grid } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";
import './Start.css';
 

class Start extends Component {
  constructor(props) {
    console.log("props", props);
    super(props);
    this.state = {
        existingUser: true,
        badCreds: this.props.badCreds,
        isAuthenticated: "",
        username: "",
        password: ""
    };
  }

//   relocate (newPage) {
//     this.props.history.push(newPage);
//   }

    componentDidMount() {
      
    }

    toggleExisting = (event) => {
        event.preventDefault();
        this.setState({ existingUser: !this.state.existingUser});
        this.props.toggleBadCreds();
    }

    validateForm() {
      return this.state.username.length > 4 && this.state.password.length > 4;
      console.log("Username and Password must be at least 5 characters long");
    }
  
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
