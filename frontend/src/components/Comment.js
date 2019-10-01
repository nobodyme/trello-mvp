import React from "react";
import FetchApi from "./FetchApi";
import SimpleForm from "./SimpleForm";

function Comment({ id }) {
  const [refetch, setRefetch] = React.useState(false);

  return (
    <>
      <div className="cardModal__comment">
        <div className="cardModal__comment__title">Activity</div>
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
              <div className="cardModal__comment__list">
                {apiData.map(comment => (
                  <div key={comment._id} className="cardModal__comment__body">
                    {comment.body}
                  </div>
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
