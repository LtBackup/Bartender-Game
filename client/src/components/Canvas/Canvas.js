import React from "react";
import { Row } from "react-bootstrap";
import "./Canvas.css";

/**
* Creates a canvas that allows you to animate
*
* @param {object} that contains all the passed down properties
* 
* @returns a canvas
*/
const Canvas = (props) => (
    <Row>
        <div id="barScene">
            <img id="barBG" src={require("../../barBG.jpg")} alt="canvas background" />
            <canvas id="barCanvas" width="100%" height="auto"></canvas>
        </div>
    </Row>
);

export default Canvas;