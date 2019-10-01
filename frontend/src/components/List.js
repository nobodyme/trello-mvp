import React from "react";
import { Droppable } from "react-beautiful-dnd";

import FetchApi from "./FetchApi";
import Card from "./Card";
import CardForm from "../components/CardForm";
import ListOptions from "../components/ListOptions";

import "../styles/components/List.css";

function List({ data, setListRefetch, cardRefetch, setCardRefetch }) {
  return (
    <FetchApi
      api={`/card/getlistcards?listId=${data._id}`}
      forceRefetch={cardRefetch}
    >
      {(apiData, error) => {
        if (error) {
          return <div>Error</div>;
        } else if (apiData) {
          return (
            <div className="list">
              <div className="list__header">
                <div className="list__title">{data.title}</div>
                <ListOptions
                  id={data._id}
                  api={"/list/deletelist"}
                  setRefetch={setListRefetch}
                />
              </div>
              <div className="list__cards">
                <Droppable droppableId={data._id}>
                  {provided => (
                    <div
                      className="list__droppableContainer"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {apiData.map((data, index) => (
                        <Card
                          data={data}
                          key={data._id}
                          index={index}
                          setRefetch={setCardRefetch}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <CardForm id={data._id} setRefetch={setCardRefetch} />
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
