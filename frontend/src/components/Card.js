import React from 'react';
import '../styles/components/Card.css';

import CardModal from './CardModal';

function Card({ data }) {
	const [showModal, setShowModal] = React.useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<div className="Card" onClick={handleShow}>
			{data.title}
			<CardModal show={showModal} />
		</div>
	);
}

export default Card;
