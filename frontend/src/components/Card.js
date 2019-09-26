import React from 'react';
import '../styles/components/Card.css';

function Card({ data, handleShowModal, handleModalData }) {
	const handleCardClick = () => {
		handleModalData(data);
		handleShowModal();
	};

	return (
		<div className="card" onClick={handleCardClick}>
			{data.title}
		</div>
	);
}

export default Card;
