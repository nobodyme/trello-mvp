import React from "react";
import axios from "../utils/axios";
import "../styles/components/BoardModal.css";

import Modal from "react-bootstrap/Modal";

function BoardModal({ show, handleCloseModal, setRefetch }) {
  const [boardName, setBoardName] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/board/addboard", { title: boardName })
      .then(result => {
        setError("");
        setRefetch(c => !c);
      })
      .catch(err => {
        setError(err.message);
      });
    setBoardName("");
    handleCloseModal();
  };

  const handleChange = event => {
    setBoardName(event.target.value);
  };

  return (
    <Modal size="sm" show={show} onHide={handleCloseModal}>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            className="boardModal__input"
            placeholder="Add Board Title"
            name="title"
            value={boardName}
            onChange={handleChange}
          />
          {error && <div>Submit Failed</div>}
          <button className="boardModal__button" type="submit">
            Create Board
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default BoardModal;
