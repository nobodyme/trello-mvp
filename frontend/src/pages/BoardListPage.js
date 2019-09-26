import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/BoardListPage.css';

import FetchApi from '../components/FetchApi';

function BoardListPage() {
	return (
		<div className="container pageContainer">
			<FetchApi api="/board/getboards">
				{(apiData, error) => {
					if (error) {
						return <div>Error</div>;
					} else if (apiData) {
						return (
							<div className="boardsListPage">
								{apiData.map(data => (
									<Link
										to={`/board/${data._id}`}
										key={data._id}
										className="board__cardHolder"
									>
										<div className="board__title">{data.title}</div>
									</Link>
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

export default BoardListPage;
