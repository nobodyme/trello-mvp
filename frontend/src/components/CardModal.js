import React from "react";
import Modal from "react-bootstrap/Modal";

import Comment from "./Comment";
import Description from "./Description";

import "../styles/components/CardModal.css";

function CardModal({ data, show, handleCloseModal }) {
  return (
    <Modal size="lg" show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <div className="cardModal__header">{data ? data.title : null}</div>
      </Modal.Header>
      <Modal.Body>
        <Description id={data ? data._id : null} />
        <Comment id={data ? data._id : null} />
      </Modal.Body>
    </Modal>
  );
}

export default CardModal;
