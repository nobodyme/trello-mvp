import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "../utils/axios";
import { IoIosTrash } from "react-icons/io";

import Comment from "./Comment";
import Description from "./Description";

import "../styles/components/CardModal.css";

function CardModal({ data, show, handleCloseModal, setRefetch }) {
  const [edit, setEdit] = React.useState(false);
  const [title, setTitle] = React.useState(data ? data.title : null);
  const toggleEdit = () => {
    setEdit(c => !c);
  };

  const deleteCard = () => {
    axios
      .post("/card/deleteCard", { cardId: data ? data._id : 1 })
      .then(res => {
        setRefetch(c => !c);
      })
      .catch(err => {});
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post("/card/updatecard", {
        id: data ? data._id : null,
        title: title
      })
      .then(res => {
        setRefetch(c => !c);
        toggleEdit();
      })
      .catch(err => {
        toggleEdit();
      });
  };

  return (
    <Modal size="lg" show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <div className="cardModal__header">
          {edit ? (
            <form onSubmit={onSubmit}>
              <input
                autoFocus
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </form>
          ) : (
            <div className="cardModal__title" onClick={toggleEdit}>
              {data ? data.title : null}
            </div>
          )}
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
