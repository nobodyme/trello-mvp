import React from "react";
import { IoMdAdd } from "react-icons/io";

import SimpleForm from "./SimpleForm";

import "../styles/components/CardForm.css";

function CardForm({ id, setRefetch }) {
  const [showCardForm, setShowCardForm] = React.useState(false);
  const handleShowCardForm = () => setShowCardForm(true);
  const handleCloseCardForm = () => setShowCardForm(false);

  return (
    <div className="cardFormContainer">
      {showCardForm === true ? (
        <div className="cardForm">
          <SimpleForm
            toggleForm={setShowCardForm}
            api="/card/addlistcard"
            inputPlaceholder="Enter a title for this card..."
            inputName="title"
            id="listId"
            idValue={id}
            buttonName="Add Card"
            setRefetch={setRefetch}
            handleClose={handleCloseCardForm}
          />
        </div>
      ) : (
        <div className="cardForm__default" onClick={handleShowCardForm}>
          <IoMdAdd />
          <span className="default__name">Add a card</span>
        </div>
      )}
    </div>
  );
}

export default CardForm;
