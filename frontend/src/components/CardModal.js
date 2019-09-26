import React from 'react';
import '../styles/components/CardModal.css';

import Modal from 'react-bootstrap/Modal';

function CardModal({ data, show, handleCloseModal }) {
	return (
		<Modal size="lg" show={show} onHide={handleCloseModal}>
			<Modal.Header closeButton>
				<div className="cardModal__header">{data ? data.title : null}</div>
			</Modal.Header>
			<Modal.Body>
				<div className="cardModal__description">
					<label for="description" className="cardModal__description__title">
						Description
					</label>
					<textarea
						className="cardModal__description__input"
						id="description"
						type="text"
						placeholder="Add a more detailed description..."
					/>
					<button className="cardModal__description__button">Save</button>
				</div>
				<div className="cardModal__comment">
					<div className="cardModal__comment__title">Activity</div>
					<input
						className="cardModal__comment__input"
						placeholder="Write a comment..."
					/>
					<button className="cardModal__comment__button">Save</button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default CardModal;
