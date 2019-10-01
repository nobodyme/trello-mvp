import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "../utils/axios";
import { IoIosTrash } from "react-icons/io";

import Comment from "./Comment";
import Description from "./Description";

import "../styles/components/CardModal.css";

function CardModal({ data, show, handleCloseModal, setRefetch }) {
  const deleteCard = () => {
    axios
      .post("/card/deleteCard", { cardId: data ? data._id : 1 })
      .then(res => {
        setRefetch(c => !c);
      })
      .catch(err => {});
  };

  return (
    <Modal size="lg" show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <div className="cardModal__header">
          <div>{data ? data.title : null}</div>
          <button className="cardModal__delete" onClick={deleteCard}>
            <IoIosTrash />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Description id={data ? data._id : null} />
        <Comment id={data ? data._id : null} />
      </Modal.Body>
    </Modal>
  );
}

export default CardModal;
