import React from "react";
import * as THREE from 'three';
import * as ReactThree from 'react-three';
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./Canvas.css";

const Canvas = (props) => (
    <Row>
        <div id="barScene">
            <img id="barBG" src={require("../../barBG.jpg")} alt="canvas background" />
            <canvas width="100%" height="auto"></canvas>
        </div>
    </Row>
);

export default Canvas;