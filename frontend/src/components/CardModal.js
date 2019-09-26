import React from 'react';
import '../styles/components/CardModal.css';

function CardModal({ show, handleClose }) {
	return (
		<div className={`${show ? 'ModalShow' : 'ModalHide'}`}>
			<div className="ModalBody">hehe</div>
		</div>
	);
}

export default CardModal;
