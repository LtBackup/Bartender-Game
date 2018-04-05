import React from "react";
import { Col, Row } from "../../components/Grid";
import "./DrinkCard.css";

/**
* Creates a card that renders each ingredient in its own row with a counter for pouring
*
* @param {object} that contains all the passed down properties
* 
* @returns a drink card
*/
const DrinkCard = (props) => (
  <div className="DrinkCard">
    <Row>
      <Col size="xs-12">
        <h1>{props.name}</h1>
      </Col>
    </Row>
    <Row>
      <Col size="xs-4">
        <h2>Ingredients</h2>
      </Col>
      <Col size="xs-4">
        <h2>Amount</h2>
      </Col>
      <Col size="xs-4">
        <h2>Poured</h2>
      </Col>
    </Row>
    {props.ingredients.map((e, i) =>
      <Row key={e.ingredient}>
        <Col size="xs-4">
          <h3>{e.ingredient}</h3>
        </Col>
        <Col size="xs-4">
          <h3>
          {e.measurement} oz
          </h3>
        </Col>
        <Col size="xs-4">
          <h3 style={{ color: props.getColor(props.status[i])}}>
          {props.counter[i].toFixed(2)} oz
          </h3>
        </Col>
      </Row>
    )}
  </div>
);

export default DrinkCard;