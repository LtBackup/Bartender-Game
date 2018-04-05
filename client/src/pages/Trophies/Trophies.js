import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Grid } from "react-bootstrap";
import DBAPI from "../../utils/DBAPI.js";
import Trophy from "../../components/Trophy"
import "./Trophies.css";

class Trophies extends Component {
  constructor(props) {
    super(props);
  this.state = {
    loggedUser: this.props.loggedUser,
    inProgress: [{drinkName: " ", timesMade: 0}]
  };
}

  /**
  * On mount, makes a call to retrieve all drinks for the current logged in user
  * 
  * @returns void
  */
  componentDidMount() {
    DBAPI.getDrinks(this.state.loggedUser)
      .then(res => {
        this.setState({ inProgress: res.data.inProgress });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col size="xs-12">
            <Jumbotron>
              <h1>Mastered Cocktails</h1>
              <p className="subtitle">Click for full drink details</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row align="center">
          {this.state.inProgress.map(e =>
            e.timesMade > 2?<Trophy key={e.drinkName} drinkData={e} />:null
          )}
        </Row>
      </Grid>
    );
  }
}

export default Trophies;
