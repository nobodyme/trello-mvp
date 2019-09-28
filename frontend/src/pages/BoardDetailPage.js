import React from "react";
import { IoMdAdd } from "react-icons/io";

import "../styles/pages/BoardDetailPage.css";

import FetchApi from "../components/FetchApi";
import List from "../components/List";
import CardModal from "../components/CardModal";
import SimpleForm from "../components/SimpleForm";

function BoardsDetailPage(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const handleModalData = data => setModalData(data);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showListForm, setShowListForm] = React.useState(false);
  const handleShowListForm = () => setShowListForm(true);
  const handleCloseListForm = () => setShowListForm(false);
  const [refetch, setRefetch] = React.useState(false);

  return (
    <div className="pageContainer">
      <>
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
                  {apiData.map(data => (
                    <List
                      handleShowModal={handleShowModal}
                      handleModalData={handleModalData}
                      data={data}
                      key={data._id}
                    />
                  ))}
                  <div className="boardDetailPage__list">
                    {showListForm === true ? (
                      <div className="boardDetailPage__form">
                        <SimpleForm
                          toggleForm={setShowListForm}
                          api="/list/addboardlist"
                          inputPlaceholder="Enter list title..."
                          inputName="title"
                          id="boardId"
                          idValue={props.match.params.id}
                          buttonName="Add List"
                          setRefetch={setRefetch}
                          handleClose={handleCloseListForm}
                        />
                      </div>
                    ) : (
                      <div
                        className="boardDetailPage__default"
                        onClick={handleShowListForm}
                      >
                        <IoMdAdd />
                        <span className="default__name">Add a list</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          }}
        </FetchApi>
        <CardModal
          data={modalData}
          show={showModal}
          handleCloseModal={handleCloseModal}
        />
      </>
    </div>
  );
}

export default BoardsDetailPage;
