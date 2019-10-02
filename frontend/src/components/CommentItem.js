import React from "react";
import axios from "../utils/axios";

import "../styles/components/CommentItem.css";

function CommentItem({ comment, setRefetch }) {
  const [edit, setEdit] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState(comment.body);

  const toggleEdit = () => {
    setEdit(c => !c);
  };

  const handleDelete = () => {
    axios
      .post("/comment/deletecomment", { commentId: comment._id })
      .then(res => {
        setRefetch(c => !c);
      })
      .catch(err => {});
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/comment/updatecomment", {
        id: comment._id,
        body: commentValue
      })
      .then(res => {
        setRefetch(c => !c);
        toggleEdit();
      })
      .catch(err => {
        toggleEdit();
      });
  };

  return (
    <div className="commentItem">
      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            className="commentItem__input"
            value={commentValue}
            onChange={e => setCommentValue(e.target.value)}
          />
        </form>
      ) : (
        <div key={comment._id} className="commentItem__body">
          {comment.body}
        </div>
      )}
      <div className="commentItem__buttons">
        <button className="commentItem__edit" onClick={toggleEdit}>
          Edit
        </button>
        <button className="commentItem__delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default CommentItem;
