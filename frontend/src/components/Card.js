import React from 'react';
import '../styles/components/Card.css';

import CardModal from './CardModal';

function Card({
	data,
	handleShowModal,
	handleCloseModal,
	show,
	modalData,
	handleModalData
}) {
	const handleCardClick = () => {
		handleModalData(data);
		handleShowModal();
	};

	return (
		<>
			<div className="card" onClick={handleCardClick}>
				{data.title}
			</div>
			<CardModal
				handleModalData={handleModalData}
				data={modalData ? modalData : data}
				show={show}
				handleCloseModal={handleCloseModal}
			/>
		</>
	);
}

export default Card;
