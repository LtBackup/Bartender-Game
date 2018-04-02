import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
//import DeleteBtn from "../../components/DeleteBtn";
// import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Col, Row, Grid } from "react-bootstrap";
// import { Form, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";
import Trophy from "../../components/Trophy"
import "./Trophies.css";

class Trophies extends Component {
  state = {
    username: "",
    drinksMastered: [{drinkName: "Manhattan", timesMade: 5}, {drinkName: "Daiquiri", timesMade: 5}]
  };

  componentDidMount() {
    //iterate through drinks mastered and make a trophy for each
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col size="xs-12">
            <Jumbotron>
              <h1>Mastered Cocktails</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {this.state.drinksMastered.map((e, i) =>
            <Col size="xs-3">
              <Trophy />
            </Col>
          )}
        </Row>
      </Grid>
    );
  }
}

export default Trophies;
