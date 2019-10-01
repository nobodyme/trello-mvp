import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "../styles/components/Card.css";

import CardModal from "../components/CardModal";

function Card({ data, index, setRefetch }) {
  const [showModal, setShowModal] = React.useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Draggable draggableId={data._id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="card"
            onClick={handleShowModal}
          >
            {data.title}
          </div>
        )}
      </Draggable>
      <CardModal
        data={data}
        show={showModal}
        setRefetch={setRefetch}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default Card;
