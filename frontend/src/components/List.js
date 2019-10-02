import React from "react";
import { Droppable } from "react-beautiful-dnd";
import axios from "../utils/axios";

import FetchApi from "./FetchApi";
import Card from "./Card";
import CardForm from "../components/CardForm";
import ListOptions from "../components/ListOptions";

import "../styles/components/List.css";

function List({ data, setListRefetch, cardRefetch, setCardRefetch }) {
  const [edit, setEdit] = React.useState(false);
  const [editValue, setEditValue] = React.useState(data.title);
  const toggleEdit = () => {
    setEdit(c => !c);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/list/updatelist", {
        id: data._id,
        title: editValue
      })
      .then(res => {
        setListRefetch(c => !c);
        toggleEdit();
      })
      .catch(err => {
        toggleEdit();
      });
  };

  return (
    <div className="list">
      <div className="list__header">
        {edit ? (
          <div className="list__title">
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                type="text"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
              />
            </form>
          </div>
        ) : (
          <div className="list__title" onClick={toggleEdit}>
            {data.title}
          </div>
        )}
        <ListOptions
          id={data._id}
          api={"/list/deletelist"}
          setRefetch={setListRefetch}
        />
      </div>
      <FetchApi
        api={`/card/getlistcards?listId=${data._id}`}
        forceRefetch={cardRefetch}
      >
        {(apiData, error) => {
          if (error) {
            return <div>Error</div>;
          } else if (apiData) {
            return (
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
            );
          } else {
            return null;
          }
        }}
      </FetchApi>
    </div>
  );
}

export default List;
