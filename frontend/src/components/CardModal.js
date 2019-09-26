import React from 'react';
import '../styles/components/CardModal.css';

function CardModal({ data, show, handleCloseModal }) {
	return (
		<div className={`${show ? 'cardModal__show' : 'cardModal__hide'}`}>
			<div className="cardModal__body">
				<div className="cardModal__body__header">
					<div>{data.title}</div>
					<button onClick={handleCloseModal}>close</button>
				</div>
				<div className="cardModal__body__description">
					<div className="cardModal__description__title">Description</div>
					<textarea
						className="cardModal__description__input"
						type="text"
						label="Write a description"
					></textarea>
					<div>
						<button>Save</button>
						<button>Close</button>
					</div>
				</div>
				<div className="cardModal__body__comment">
					<div className="cardModal__comment__title">Activity</div>
					<input className="cardModal__comment__input"></input>
					<button></button>
				</div>
			</div>
		</div>
	);
}

export default CardModal;
