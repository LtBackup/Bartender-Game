import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DrinkCard from "../../components/DrinkCard";
import Canvas from "../../components/Canvas";
import Serve from "../../components/Serve";
import Rack from "../../components/Rack";
// import { Container } from "../../components/Grid";
import { Col, Row, Grid } from "react-bootstrap";
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";
import './Bar.css';


class Bar extends Component {
  state = {
    username: "bobby",
    currentDrinkData: {},
    ingredients: [], //objects with ingredients and pour amounts
    keysPressed: [false, false, false, false],
    counters: [0, 0, 0, 0],
    drinkStatus: [], //0 = not filled, 1 = good fill, 2 = overfilled
    timer: 0,
    getColor: (status) => {
      if(status === 0){
        return "blue";
      }
      else if( status === 1){
        return "green";
      }
      else if (status === 2){
        return "red";
      }
    }
  };

  reset = () => {
    this.setState({ counters: [0, 0, 0, 0], drinkStatus: []});
    this.getCocktail();
  }

  toggleKeys = e => {
    let key = e.key;
    if (key > 0 && key < 5) {
      let copyPress = [...this.state.keysPressed];
      copyPress[key - 1] = e.type == 'keydown';
      this.setState({ keysPressed: copyPress });
      if (this.state.keysPressed.every(function (i) { return !i; })
        && this.state.drinkStatus.some(function (i) { return i === 2; })) {
        alert("Proportions are off...Let's try again.");
        this.reset();
      }
      else if (this.state.keysPressed.every(function (i) { return !i; })
        && this.state.drinkStatus.every(function (i) { return i === 1; })) {
        alert("Nice Pour! Let's mix another.");
        
        DBAPI.updateMastery(this.state.username, this.state.currentDrinkData.strDrink);
        //increment user stats
        this.reset();
      }
    };
  }

  count = () => {
    let copyCount = [...this.state.counters];
    let copyStatus = [...this.state.drinkStatus];
    this.state.keysPressed.forEach((e, i) => {
      if (e) {
        copyCount[i] += .005;
        this.setState({ counters: copyCount });
      }
      if (i < this.state.ingredients.length) {
        if (this.state.counters[i] >= parseFloat(this.state.ingredients[i].measurement) - .1) {
          //set color green
          copyStatus[i] = 1;
          this.setState({ drinkStatus: copyStatus });
        }
        if (this.state.counters[i] >= parseFloat(this.state.ingredients[i].measurement) + .1) {
          //set color red
          copyStatus[i] = 2;
          this.setState({ drinkStatus: copyStatus });
        }
      }
    })
    
    requestAnimationFrame(this.count);
  }

  getAvg = (strDash) => {
    let values = strDash.split("-");
    console.log("values", values);
    return (parseFloat(values[0]) + parseFloat(values[1])) / 2;
  }

  toOunce = (strMeasure) => {
    let parseArr = strMeasure.split(" "); //array of each piece
    let result = 0;
    parseArr.forEach((e, i) => {
      console.log(e);
      if ((e.toLowerCase() === "oz" || e.toLowerCase() === "cl" || e.toLowerCase() === "tbsp" || e.toLowerCase() === "tsp") && i !== parseArr.length - 1) {
        parseArr.splice(i + 1, parseArr.length - (i + 1));
      }
    })
    let measure = parseArr.pop();
    for (let i = 0; i < parseArr.length; i++) {
      if (parseArr[i].includes("-")) {
        parseArr.splice(i, 1, this.getAvg(parseArr[i]));
      }
      result += eval(parseArr[i]);
    }
    if (measure.toLowerCase() === "cl") {
      return result * (3 / 10);
    }
    if (measure.toLowerCase() === "tbsp") {
      return result / 2;
    }
    if (measure.toLowerCase() === "tsp") {
      return result / 6;
    }
    return result;
  }

  addListeners = () => {
    document.removeEventListener("keydown", this.toggleKeys);
    document.removeEventListener("keyup", this.toggleKeys);
    document.addEventListener("keydown", this.toggleKeys);
    document.addEventListener("keyup", this.toggleKeys);
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
          if (k.includes("Ingredient") && res.data.drinks[0][k]) {
            validIngredients.push(res.data.drinks[0][k].trim());
          }
          if (k.includes("Measure") && res.data.drinks[0][k]) {
            validMeasurements.push(res.data.drinks[0][k].trim());
            console.log(res.data.drinks[0][k]);
          }
        }
        validMeasurements.forEach((e, i) => {
          let position = e.indexOf("oz")
          if (e.toLowerCase().includes("oz") || e.toLowerCase().includes("cl") || e.toLowerCase().includes("tbsp")) {
            const parsedMeasure = this.toOunce(e).toFixed(2);
            validComponents.push({ ingredient: validIngredients[i], measurement: parsedMeasure });
            this.state.drinkStatus.push(0);
          }
        })
        this.setState({ ingredients: validComponents });
      })
      .then(res => {
        requestAnimationFrame(this.count);
        console.log(this.state.currentDrinkData);
        console.log(this.state.ingredients);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getCocktail();
    this.addListeners();
    console.log(this.state.username);
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
              counter={this.state.counters}
              status={this.state.drinkStatus}
              getColor={this.state.getColor} />
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
