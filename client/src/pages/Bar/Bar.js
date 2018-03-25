import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DrinkCard from "../../components/DrinkCard";
import Canvas from "../../components/Canvas";
import Serve from "../../components/Serve";
import Rack from "../../components/Rack";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";
import './Bar.css';


class Bar extends Component {
  // Initialize this.state.books as an empty array
  state = {
    currentDrinkData: {}
  };

  componentDidMount() {
    // CocktailAPI.getCocktail("Manhattan")
    // .then(res => this.setState({currentDrinkData: res.data.drinks[0]}))
    // .then(res => console.log(this.state.currentDrinkData))
    // .catch(err => console.log(err));
    CocktailAPI.getClassic()
      .then(res => this.setState({ currentDrinkData: res.data.drinks[0] }))
      .then(res => console.log(this.state.currentDrinkData))
      .catch(err => console.log(err));
    // CocktailAPI.getRandom()
    // .then(res => this.setState({currentDrinkData: res.data.drinks[0]}))
    // .then(() => console.log(this.state.currentDrinkData))
    // .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <div className="stage">
          <DrinkCard />
          <h1>Books On My List</h1>
          <Canvas />
          <Serve />
          <Rack />
        </div>
      </Container>
    );
  }
}

export default Bar;
