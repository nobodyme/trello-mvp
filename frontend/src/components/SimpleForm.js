import React from "react";
import axios from "../utils/axios";
import { IoIosClose } from "react-icons/io";

import "../styles/components/SimpleForm.css";

function SimpleForm({
  api,
  inputPlaceholder,
  inputName,
  id,
  idValue,
  buttonName,
  setRefetch,
  toggleForm,
  handleClose,
  result
}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(api, { [inputName]: value, [id]: idValue })
      .then(result => {
        setError("");
        setRefetch(c => !c);
      })
      .catch(err => {
        setError(err.message);
      });
    setValue("");
    if (toggleForm) {
      toggleForm(c => !c);
    }
    if (result) {
      result(value);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          className="simpleForm__input"
          placeholder={inputPlaceholder}
          name={inputName}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        {error && <div className="form__error">Submit Failed</div>}
        <button className="simpleForm__button" type="submit">
          {buttonName}
        </button>
        {handleClose && <IoIosClose onClick={handleClose} />}
      </form>
    </div>
  );
}

export default SimpleForm;
