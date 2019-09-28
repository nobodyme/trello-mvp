import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "../styles/components/Card.css";

function Card({ data, handleShowModal, handleModalData, index }) {
  const handleCardClick = () => {
    handleModalData(data);
    handleShowModal();
  };

  return (
    <Draggable draggableId={data._id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="card"
          onClick={handleCardClick}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
