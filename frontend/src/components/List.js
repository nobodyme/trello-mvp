import React from 'react';
import '../styles/components/List.css';
import { Droppable } from 'react-beautiful-dnd';

import FetchApi from './FetchApi';
import Card from './Card';
import SimpleForm from './SimpleForm';

function List({ data, handleModalData, handleShowModal }) {
	const [refetch, setRefetch] = React.useState(false);
	const [showCardForm, setShowCardForm] = React.useState(false);

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
							<Droppable droppableId={data._id}>
								{provided => (
									<div
										className="list__cards"
										innerRef={provided.innerRef}
										{...provided.droppableProps}
									>
										{apiData.map((data, index) => (
											<Card
												index={index}
												handleModalData={handleModalData}
												handleShowModal={handleShowModal}
												data={data}
												key={data._id}
											/>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							<div className="list__cards__new">
								{showCardForm === true ? (
									<div className="list__card__form">
										<SimpleForm
											toggleForm={setShowCardForm}
											api="/card/addlistcard"
											inputPlaceholder="Enter a title for this card..."
											inputName="title"
											id="listId"
											idValue={data._id}
											buttonName="Add Card"
											setRefetch={setRefetch}
										/>
									</div>
								) : (
									<div
										className="list__card__default"
										onClick={() => setShowCardForm(true)}
									>
										Add a card
									</div>
								)}
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
