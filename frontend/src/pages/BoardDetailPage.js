import React from 'react';

import '../styles/pages/BoardDetailPage.css';

import FetchApi from '../components/FetchApi';
import List from '../components/List';

function BoardsDetailPage(props) {
	const [showModal, setShowModal] = React.useState(false);
	const [modalData, setModalData] = React.useState(null);
	const handleModalData = data => setModalData(data);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);
	const toggleCloseModal = () => {
		if (showModal) {
			handleCloseModal();
		}
	};

	return (
		<div className="pageContainer" onClick={toggleCloseModal}>
			<FetchApi api={`/list/getboardlists?boardId=${props.match.params.id}`}>
				{(apiData, error) => {
					if (error) {
						return <div>Error</div>;
					} else if (apiData) {
						return (
							<div className="boardDetailPage">
								{apiData.map(data => (
									<List
										handleShowModal={handleShowModal}
										handleCloseModal={handleCloseModal}
										handleModalData={handleModalData}
										modalData={modalData}
										show={showModal}
										data={data}
										key={data._id}
									/>
								))}
							</div>
						);
					} else {
						return null;
					}
				}}
			</FetchApi>
		</div>
	);
}

export default BoardsDetailPage;
