import React from 'react';
import '../styles/components/List.css';

import FetchApi from './FetchApi';
import Card from './Card';

function List({
	data,
	modalData,
	handleModalData,
	handleShowModal,
	handleCloseModal,
	show
}) {
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
											modalData={modalData}
											handleModalData={handleModalData}
											handleShowModal={handleShowModal}
											handleCloseModal={handleCloseModal}
											show={show}
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
