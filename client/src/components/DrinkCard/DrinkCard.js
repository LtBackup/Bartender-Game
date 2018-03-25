import React from "react";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./DrinkCard.css";

const DrinkCard = (props) => (
  <div className="DrinkCard">
    <Row>
      {props.name}
    </Row>
    <Row>
          <Col size="xs-4">
          Ingredients
          </Col>
          <Col size="xs-4">
          Amount
          </Col>
          <Col size="xs-4">
          Poured
          </Col>
      </Row>

  </div>
);

export default DrinkCard;