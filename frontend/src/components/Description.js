import React from "react";
import FetchApi from "./FetchApi";
import SimpleForm from "./SimpleForm";

import "../styles/components/Description.css";

function Description({ id }) {
  const [refetch, setRefetch] = React.useState(false);

  return (
    <FetchApi
      api={`/card/getcard?cardId=${id ? id : 1}`}
      forceRefetch={refetch}
    >
      {(apiData, error) => {
        if (error) {
          return <div>Error</div>;
        } else if (apiData) {
          return (
            <div className="description">
              <div className="description__title">Description</div>
              {apiData && apiData.description ? (
                <div>{apiData.description}</div>
              ) : (
                <SimpleForm
                  api="/card/addcarddescription"
                  inputPlaceholder="Add a more detailed description..."
                  inputName="description"
                  id="cardId"
                  idValue={id ? id : null}
                  buttonName="Save"
                  setRefetch={setRefetch}
                />
              )}
            </div>
          );
        } else {
          return null;
        }
      }}
    </FetchApi>
  );
}

export default Description;
