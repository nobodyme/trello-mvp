import React from "react";
import FetchApi from "./FetchApi";
import SimpleForm from "./SimpleForm";
import CommentItem from "./CommentItem";

import "../styles/components/Comment.css";

function Comment({ id }) {
  const [refetch, setRefetch] = React.useState(false);

  return (
    <>
      <div className="comment">
        <div className="comment__title">Activity</div>
        <SimpleForm
          api="/comment/addcardcomment"
          inputPlaceholder="Write a comment..."
          inputName="comment"
          id="cardId"
          idValue={id ? id : null}
          buttonName="Save"
          setRefetch={setRefetch}
        />
      </div>
      <FetchApi
        api={`/comment/getcardcomments?cardId=${id ? id : 1}`}
        forceRefetch={refetch}
      >
        {(apiData, error) => {
          if (error) {
            return <div>Error</div>;
          } else if (apiData) {
            return (
              <div className="comment__list">
                {apiData.map(comment => (
                  <CommentItem comment={comment} setRefetch={setRefetch} />
                ))}
              </div>
            );
          } else {
            return null;
          }
        }}
      </FetchApi>
    </>
  );
}

export default Comment;
