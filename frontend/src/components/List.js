import React from 'react';
import '../styles/components/List.css';

import FetchApi from './FetchApi';
import Card from './Card';

function List({ data, handleModalData, handleShowModal }) {
	return (
		<>
			<FetchApi api={`/card/getlistcards?listId=${data._id}`}>
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
								</div>
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

export default List;
