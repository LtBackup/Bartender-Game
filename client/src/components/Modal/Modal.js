import React from "react";
import "./Modal.css";

const messages = ["Welcome to the bar! Time to learn some drinks. Hold down buttons 1-4 on the keyboard to pour the various ingredients in the prescribed amounts. Be careful not to overfill your drink!",
    "Proportions are off...Let's try again.", "Nice Pour! Let's mix another."]

const Modal = (props) => (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>StirUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>{messages[props.message]}</h4>
            <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
)
export default Modal;