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
    currentDrinkData: {},
    ingredients: [] //objects with ingredients and pour amounts
  };

  componentDidMount() {
    // CocktailAPI.getCocktail("Manhattan")
    // .then(res => this.setState({currentDrinkData: res.data.drinks[0]}))
    // .then(res => console.log(this.state.currentDrinkData))
    // .catch(err => console.log(err));

    CocktailAPI.getClassic()
      .then(res => {
        let validIngredients = [];
        let validMeasurements = [];
        let validComponents = [];
        this.setState({ currentDrinkData: res.data.drinks[0] });
        for (let k in res.data.drinks[0]) {
          //console.log(k);
          if (k.includes("Ingredient") && res.data.drinks[0][k] !== "") {
            validIngredients.push(res.data.drinks[0][k]);
          }
          if (k.includes("Measure") && res.data.drinks[0][k] !== "") {
            validMeasurements.push(res.data.drinks[0][k]);
            console.log(res.data.drinks[0][k]);
          }
        }
        validMeasurements.forEach((e, i) => {
          if (e.includes("oz")) {
            validComponents.push({ ingredient: validIngredients[i], measurement: validMeasurements[i] });
          }
        })
        this.setState({ ingredients: validComponents });
      })
      .then(res => {
        console.log(this.state.currentDrinkData);
        console.log(this.state.ingredients);
      })
      .catch(err => console.log(err));
    // CocktailAPI.getRandom()
    // .then(res => this.setState({currentDrinkData: res.data.drinks[0]}))
    // .then(() => console.log(this.state.currentDrinkData))
    // .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.ingredients);
    return (
      <Container fluid>
        <div className="stage">
          <DrinkCard name={this.state.currentDrinkData.strDrink} ingredients={this.state.ingredients}/>
          <h1>{this.state.currentDrinkData.strDrink}</h1>
          <Canvas />
          <Serve />
          <Rack />
        </div>
      </Container>
    );
  }
}

export default Bar;
