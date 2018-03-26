import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DrinkCard from "../../components/DrinkCard";
import Canvas from "../../components/Canvas";
import Serve from "../../components/Serve";
import Rack from "../../components/Rack";
// import { Container } from "../../components/Grid";
import { Col, Row, Grid } from "react-bootstrap";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";
import './Bar.css';


class Bar extends Component {
  state = {
    currentDrinkData: {},
    ingredients: [], //objects with ingredients and pour amounts
    keysPressed: [false, false, false, false],
    counters: [],
    drinkDone: false
  };

  incrementCounter = e => {
    let keypress = e.key;
    if (keypress > 0 && keypress < 5) {
      let copy = this.state.keysPressed.slice();
      copy[keypress - 1] = true;
      this.setState({ keysPressed: copy });
      this.count();
      console.log(this.state.keysPressed);
    }
  };

  stopCounting = e => {
    let keyup = e.key;
    if (keyup > 0 && keyup < 5) {
      let copyStop = this.state.keysPressed.slice();
      copyStop[keyup - 1] = false;
      this.setState({ keysPressed: copyStop });
      console.log(this.state.keysPressed);
    };
  }

    count = () => {
      let copyCount = this.state.keysPressed.slice();
      this.state.keysPressed.forEach((e, i) => {
        if(e) {
          copyCount[i] += .01;
          this.setState({ counters: copyCount });
        }
      })
      console.log(this.state.counters);
    }

    addListeners = () => {
      document.addEventListener("keydown", this.incrementCounter);
      document.addEventListener("keyup", this.stopCounting);
    }

    getCocktail = () => {
      // CocktailAPI.getCocktail("Manhattan")
      // .then(res => this.setState({currentDrinkData: res.data.drinks[0]}))
      // .then(res => console.log(this.state.currentDrinkData))
      // .catch(err => console.log(err));
      // CocktailAPI.getRandom()
      // .then(res => this.setState({currentDrinkData: res.data.drinks[0]}))
      // .then(() => console.log(this.state.currentDrinkData))
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
              validIngredients.push(res.data.drinks[0][k].trim());
            }
            if (k.includes("Measure") && res.data.drinks[0][k] !== "") {
              validMeasurements.push(res.data.drinks[0][k].trim());
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
    }

    componentDidMount() {
      this.getCocktail();
      this.addListeners();
    }

    render() {
      //console.log(this.state.ingredients);
      return (
        <Grid fluid>
          <Row>
            <div className="stage">
              <DrinkCard
              name={this.state.currentDrinkData.strDrink}
              ingredients={this.state.ingredients} 
              counter={this.state.counters}/>
              <Canvas />
              <Serve />
              <Rack />
            </div>
          </Row>
        </Grid>
      );
    }
  }

  export default Bar;
