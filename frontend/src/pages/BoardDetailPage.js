import React from 'react';
import FetchApi from '../components/FetchApi';
import List from '../components/List';

import '../styles/pages/BoardDetailPage.css';

function BoardsDetailPage(props) {
	return (
		<div className="pageContainer">
			<FetchApi api={`/list/getboardlists?boardId=${props.match.params.id}`}>
				{(apiData, error) => {
					if (error) {
						return <div>Error</div>;
					} else if (apiData) {
						return (
							<div className="boardDetailPage">
								{apiData.map(data => (
									<List data={data} key={data._id} />
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
