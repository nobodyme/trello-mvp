import React from "react";
import "../styles/components/List.css";
import { Droppable } from "react-beautiful-dnd";

import FetchApi from "./FetchApi";
import Card from "./Card";
import SimpleForm from "./SimpleForm";
import { IoMdAdd } from "react-icons/io";

function List({ data, refetch, setRefetch }) {
  const [showCardForm, setShowCardForm] = React.useState(false);
  const handleShowCardForm = () => setShowCardForm(true);
  const handleCloseCardForm = () => setShowCardForm(false);

  return (
    <FetchApi
      api={`/card/getlistcards?listId=${data._id}`}
      forceRefetch={refetch}
    >
      {(apiData, error) => {
        if (error) {
          return <div>Error</div>;
        } else if (apiData) {
          return (
            <div className="list">
              <div className="list__title">{data.title}</div>
              <div className="list__cards">
                <Droppable droppableId={data._id}>
                  {provided => (
                    <div
                      className="list__droppableContainer"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {apiData.map((data, index) => (
                        <Card data={data} key={data._id} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div className="list__cards__new">
                  {showCardForm === true ? (
                    <div className="list__card__form">
                      <SimpleForm
                        toggleForm={setShowCardForm}
                        api="/card/addlistcard"
                        inputPlaceholder="Enter a title for this card..."
                        inputName="title"
                        id="listId"
                        idValue={data._id}
                        buttonName="Add Card"
                        setRefetch={setRefetch}
                        handleClose={handleCloseCardForm}
                      />
                    </div>
                  ) : (
                    <div
                      className="list__card__default"
                      onClick={handleShowCardForm}
                    >
                      <IoMdAdd />
                      <span className="default__name">Add a card</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      }}
    </FetchApi>
  );
}

export default List;
