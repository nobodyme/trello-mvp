import React from 'react';
import '../styles/components/List.css';

import FetchApi from './FetchApi';
import Card from './Card';
import SimpleForm from './SimpleForm';

function List({ data, handleModalData, handleShowModal }) {
	const [refetch, setRefetch] = React.useState(false);

	return (
		<FetchApi
			api={`/card/getlistcards?listId=${data._id}`}
			forceRefetch={refetch}
		>
			{(apiData, error) => {
				if (error) {
					return <div>Error</div>;
				} else if (apiData) {
					return (
						<div className="list">
							<div className="list__title">{data.title}</div>
							<div className="list__cards">
								{apiData.map(data => (
									<Card
										handleModalData={handleModalData}
										handleShowModal={handleShowModal}
										data={data}
										key={data._id}
									/>
								))}
								<div>
									<SimpleForm
										api="/card/addlistcard"
										inputPlaceholder="Enter a title for this card..."
										inputName="title"
										id="listId"
										idValue={data._id}
										buttonName="Add Card"
										setRefetch={setRefetch}
									/>
								</div>
							</div>
						</div>
					);
				} else {
					return null;
				}
			}}
		</FetchApi>
	);
}

export default List;
