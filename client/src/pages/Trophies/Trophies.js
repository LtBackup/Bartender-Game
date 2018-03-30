import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
//import DeleteBtn from "../../components/DeleteBtn";
// import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Col, Row, Grid } from "react-bootstrap";
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";
import "./Trophies.css";

class Trophies extends Component {
  // Initialize this.state.books as an empty array
//   state = {
//     books: []
//   };

  componentDidMount(){
    // this.setState({books: API.getBooks()});
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Mastered Cocktails</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" />
              <Input name="author" placeholder="Author (required)" />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" />
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Trophies;
