import React from "react";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./DrinkCard.css";

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
          <h3>{e.measurement}</h3>
        </Col>
        <Col size="xs-4">
          <h3>{props.counter[i]}</h3>
        </Col>
      </Row>
    )}
  </div>
);

export default DrinkCard;