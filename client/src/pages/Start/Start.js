import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";

class Start extends Component {
    state = {
        loggedIn: false
    };

    componentDidMount() {
        // this.setState({ books: API.getBooks() });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Jumbotron>
                        <h1>Let's Mix it Up!</h1>
                    </Jumbotron>
                    <Row>
                    //Login here
                    </Row>
                </Row>
            </Container>
        );
    }
}

export default Start;
