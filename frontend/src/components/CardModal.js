import React from "react";
import "../styles/components/CardModal.css";

import Modal from "react-bootstrap/Modal";
import SimpleForm from "./SimpleForm";
import FetchApi from "./FetchApi";

function CardModal({ data, show, handleCloseModal }) {
  const [refetch, setRefetch] = React.useState(false);
  const [desc, setDesc] = React.useState(null);

  return (
    <Modal size="lg" show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <div className="cardModal__header">{data ? data.title : null}</div>
      </Modal.Header>
      <Modal.Body>
        <div className="cardModal__description">
          <div className="cardModal__description__title">Description</div>
          {desc ? (
            <div>{desc}</div>
          ) : data && data.description ? (
            <div>{data.description}</div>
          ) : (
            <SimpleForm
              api="/card/addcarddescription"
              inputPlaceholder="Add a more detailed description..."
              inputName="description"
              id="cardId"
              idValue={data ? data._id : null}
              buttonName="Save"
              setRefetch={setRefetch}
              result={setDesc}
            />
          )}
        </div>
        <div className="cardModal__comment">
          <div className="cardModal__comment__title">Activity</div>
          <SimpleForm
            api="/comment/addcardcomment"
            inputPlaceholder="Write a comment..."
            inputName="comment"
            id="cardId"
            idValue={data ? data._id : null}
            buttonName="Save"
            setRefetch={setRefetch}
          />
        </div>
        <FetchApi
          api={`/comment/getcardcomments?cardId=${data ? data._id : 1}`}
          forceRefetch={refetch}
        >
          {(apiData, error) => {
            if (error) {
              return <div>Error</div>;
            } else if (apiData) {
              return (
                <div className="cardModal__comment__list">
                  {apiData.map(comment => (
                    <div key={comment._id} className="cardModal__comment__body">
                      {comment.body}
                    </div>
                  ))}
                </div>
              );
            } else {
              return null;
            }
          }}
        </FetchApi>
      </Modal.Body>
    </Modal>
  );
}

export default CardModal;
