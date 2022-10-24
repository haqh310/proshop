import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function ModalCustom({show, handleClose, title, content}) {
  return (
    <Modal centered show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleClose(true)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCustom;
