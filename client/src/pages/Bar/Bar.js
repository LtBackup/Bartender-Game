import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DrinkCard from "../../components/DrinkCard"
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import CocktailAPI from "../../utils/CocktailAPI.js";
//import DBAPI from "../../utils/DBAPI.js";

class Bar extends Component {
  // Initialize this.state.books as an empty array
  state = {
    currentDrink: ""
  };

  componentDidMount(){
    this.setState({currentDrink: CocktailAPI.getClassic().drinks[0].strDrink});
    console.log(this.state.currentDrink);
  }

  render() {
    return (
      <Container fluid>
        <DrinkCard />
          <Row>
              <Col size="xs-4">
              </Col>
              <Col size="xs-4">
              </Col>
              <Col size="xs-4">
              </Col>
            <form>
              <Input name="title" placeholder="Title (required)" />
              <Input name="author" placeholder="Author (required)" />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" />
              <FormBtn>Submit Book</FormBtn>
            </form>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bar;
