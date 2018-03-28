import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
// import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Col, Row, Grid } from "react-bootstrap";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";
import './Start.css';
 

class Start extends Component {
    state = {
        existingUser: true,
        loggedIn: false,
        email: "",
        password: ""
    };

    componentDidMount() {
    }

    toggleExisting = () => {
        this.setState({ existingUser: !this.state.existingUser})
    }
  
    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Jumbotron>
                        <h1>Let's Mix it Up!</h1>
                    </Jumbotron>
                    {this.state.existingUser?
                    <Login toggle={this.state} validateForm={this.validateForm} /> :
                    <SignUp toggle={this.state} />}
                </Row>
            </Grid>
        );
    }
}

export default Start;
