import React, { Component } from "react";
import * as THREE from 'three'
//import Jumbotron from "../../components/Jumbotron";
//import Modals from "../../components/Modals";
import DrinkCard from "../../components/DrinkCard";
import Canvas from "../../components/Canvas";
import Serve from "../../components/Serve";
import Rack from "../../components/Rack";
// import { Container } from "../../components/Grid";
import { Col, Row, Grid } from "react-bootstrap";
import { Button, Modal } from 'react-bootstrap';
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import CocktailAPI from "../../utils/CocktailAPI.js";
import DBAPI from "../../utils/DBAPI.js";
import './Bar.css';

const messages = ["Welcome to the bar! Time to learn some drinks. Hold down buttons 1-4 on the keyboard to pour the various ingredients in the prescribed amounts. Be careful not to overfill your drink!",
    "Proportions are off...Let's try again.", "Nice Pour! Let's mix another."]

class Bar extends Component {
  state = {
    username: "bobby",
    currentDrinkData: {},
    ingredients: [], //objects with ingredients and pour amounts
    keysPressed: [false, false, false, false],
    counters: [0, 0, 0, 0],
    drinkStatus: [], //0 = not filled, 1 = good fill, 2 = overfilled
    timer: 0,
    modalShow: true,
    modalMessage: 0, //0 is welcome, 1 is lose, 2 is win
    animating: false,
  };

  reset = () => {
    this.setState({ counters: [0, 0, 0, 0], drinkStatus: [] });
    this.getCocktail();
  }

  handleClose = () => {
    this.setState({ modalShow: false });
  }

  getColor = (status) => {
    if (status === 0) {
      return "blue";
    }
    else if (status === 1) {
      return "green";
    }
    else if (status === 2) {
      return "red";
    }
  }
  
  // handleShow() {
  //   this.setState({ modalShow: true });
  // }

  toggleKeys = e => {
    let key = e.key;
    if (key > 0 && key < 5) {
      let copyPress = [...this.state.keysPressed];
      copyPress[key - 1] = e.type == 'keydown';
      this.setState({ keysPressed: copyPress });
      if (this.state.keysPressed.every(function (i) { return !i; })
        && this.state.drinkStatus.some(function (i) { return i === 2; })) {
          this.setState({ modalShow: true, modalMessage: 1 });
        // alert("Proportions are off...Let's try again.");
        this.reset();
      }
      else if (this.state.keysPressed.every(function (i) { return !i; })
        && this.state.drinkStatus.every(function (i) { return i === 1; })) {
          this.setState({ modalShow: true, modalMessage: 2 });
        // alert("Nice Pour! Let's mix another.");
        DBAPI.updateMastery(this.state.username, this.state.currentDrinkData.strDrink);
        this.reset();
      }
    };
  }

  setStage = () => {
    var THREE = require('three');
    /* Sets up scene */
    let renderer;
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("barCanvas"), alpha: true, antialias: true });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);

    var scene = new THREE.Scene();

    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    var light1 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light1);

    //setup arrays for visual elements in each scene
    var meshArr1 = [];
    var meshArr2 = [];
    var meshArr3 = [];
    var meshArr4 = [];
    var geometryArr1 = [];
    var geometryArr2 = [];
    var geometryArr3 = [];
    var geometryArr4 = [];

    var meshArrs = [meshArr1, meshArr2, meshArr3, meshArr4];
    var geometryArrs = [geometryArr1, geometryArr2, geometryArr3, geometryArr4];

    //Scene 1 visual elements
    var geometry = new THREE.IcosahedronGeometry(2000);
    var normalMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    var planeGeometry = new THREE.PlaneGeometry(6000, 6000, 50, 50);
    geometryArr1.push(geometry, planeGeometry);

    var material = new THREE.MeshStandardMaterial({ color: 0xa200ff, wireframe: true, side: THREE.DoubleSide });
    var normalMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    var shape = new THREE.Mesh(geometry, normalMaterial);
    var plane = new THREE.Mesh(planeGeometry, material);
    meshArr1.push(shape, plane);
    plane.position.set(0, -150, 0);
    shape.position.set(0, 0, 0);
    plane.rotation.x += -Math.PI / 2;

    scene.add(plane, shape);
  }

  count = () => {
    let copyCount = [...this.state.counters];
    let copyStatus = [...this.state.drinkStatus];
    this.state.keysPressed.forEach((e, i) => {
      if (e) {
        copyCount[i] += .01;
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
        });
        this.setState({ ingredients: validComponents });
      })
      .then(res => {
        if (!this.state.animating) {
          console.log(this.state.animating);
          requestAnimationFrame(this.count);
          this.setState({ animating: true });
        }
        console.log(this.state.currentDrinkData);
        console.log(this.state.ingredients);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getCocktail();
    this.addListeners();
    this.setStage();
    console.log(this.state.username);
  }

  render() {
    return (
      <div>
        <Modal show={this.state.modalShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>StirUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>{messages[this.state.modalMessage]}</h4>
            <p>Drink Details Here</p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
        {/* <Modal message={this.state.modalMessage} handleClose={this.handleClose} show={this.state.modalShow} /> */}
        <Grid fluid>
          <Row>
            <div className="stage">
              <DrinkCard
                name={this.state.currentDrinkData.strDrink}
                ingredients={this.state.ingredients}
                counter={this.state.counters}
                status={this.state.drinkStatus}
                getColor={this.getColor} />
              <Canvas />
              <Serve />
              <Rack />
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Bar;
