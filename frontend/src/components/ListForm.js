import React from "react";
import { IoMdAdd } from "react-icons/io";

import SimpleForm from "../components/SimpleForm";

import "../styles/components/ListForm.css";

function ListForm({ props, setRefetch }) {
  const [showListForm, setShowListForm] = React.useState(false);
  const handleShowListForm = () => setShowListForm(true);
  const handleCloseListForm = () => setShowListForm(false);

  return (
    <div className="listFormContainer">
      {showListForm === true ? (
        <div className="listForm">
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
        <div className="listForm__default" onClick={handleShowListForm}>
          <IoMdAdd />
          <span className="default__name">Add a list</span>
        </div>
      )}
    </div>
  );
}

export default ListForm;
