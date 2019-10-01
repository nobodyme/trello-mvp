import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { IoIosMore } from "react-icons/io";
import axios from "../utils/axios";

import "../styles/components/ListOptions.css";

class CustomToggle extends React.Component {
  handleClick = e => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

function ListOptions({ id, api, setRefetch }) {
  const handleClick = () => {
    axios
      .post(api, { listId: id })
      .then(res => {
        setRefetch(c => !c);
      })
      .catch(err => {});
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <IoIosMore />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={handleClick}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ListOptions;
