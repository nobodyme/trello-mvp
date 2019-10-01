import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/BoardListPage.css";

import FetchApi from "../components/FetchApi";
import BoardModal from "../components/BoardModal";

function BoardListPage() {
  const [showModal, setShowModal] = React.useState(false);
  const [refetch, setRefetch] = React.useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const colorArray = [
    "#4C51BF",
    "#4A5568",
    "#C53030",
    "#6B46C1",
    "#C05621",
    "#B7791F",
    "#2F855A",
    "#2C7A7B",
    "#2B6CB0"
  ];

  return (
    <div className="container pageContainer">
      <>
        <FetchApi api="/board/getboards" forceRefetch={refetch}>
          {(apiData, error) => {
            if (error) {
              return <div>Error</div>;
            } else if (apiData) {
              return (
                <div className="boardsListPage">
                  {apiData.map((data, index) => (
                    <Link
                      style={{ background: colorArray[index % 9] }}
                      to={`/board/${data._id}`}
                      key={data._id}
                      className="board__cardHolder"
                    >
                      <div className="board__title">{data.title}</div>
                    </Link>
                  ))}
                  <div
                    className="board__cardHolder board__new"
                    onClick={handleShowModal}
                  >
                    Create New Board
                  </div>
                </div>
              );
            } else {
              return null;
            }
          }}
        </FetchApi>
        <BoardModal
          setRefetch={setRefetch}
          show={showModal}
          handleCloseModal={handleCloseModal}
        />
      </>
    </div>
  );
}

export default BoardListPage;
