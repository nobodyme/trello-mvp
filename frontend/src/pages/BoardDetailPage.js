import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "../utils/axios";

import "../styles/pages/BoardDetailPage.css";

import FetchApi from "../components/FetchApi";
import List from "../components/List";
import ListForm from "../components/ListForm";

function BoardsDetailPage(props) {
  const [refetch, setRefetch] = React.useState(false);
  const [cardRefetch, setCardRefetch] = React.useState(false);

  const handleDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    axios
      .post("/card/updatecardorder", {
        destinationlistId: destination.droppableId,
        destinationIndex: destination.index,
        cardId: draggableId
      })
      .then(res => {
        setCardRefetch(c => !c);
        return;
      })
      .catch(err => {
        return;
      });
  };

  return (
    <div className="pageContainer">
      <FetchApi
        api={`/list/getboardlists?boardId=${props.match.params.id}`}
        forceRefetch={refetch}
      >
        {(apiData, error) => {
          if (error) {
            return <div>Error</div>;
          } else if (apiData) {
            return (
              <div className="boardDetailPage">
                <DragDropContext onDragEnd={handleDragEnd}>
                  {apiData.map(data => (
                    <List
                      data={data}
                      key={data._id}
                      setListRefetch={setRefetch}
                      cardRefetch={cardRefetch}
                      setCardRefetch={setCardRefetch}
                    />
                  ))}
                </DragDropContext>
                <ListForm props={props} setRefetch={setRefetch} />
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

export default BoardsDetailPage;
