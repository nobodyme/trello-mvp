import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/BoardsPage.css';

import FetchApi from '../components/FetchApi';
import Card from '../components/Card';

function BoardsPage() {
	return (
		<div className="container pageContainer">
			<FetchApi api="/board/getboards">
				{(apiData, error) => {
					if (error) {
						return <div>Error</div>;
					} else if (apiData) {
						return (
							<div className="boards">
								{apiData.map(data => (
									<Link
										to={`/board/${data._id}`}
										key={data._id}
										className="board__cardHolder"
									>
										<Card>
											<div className="board__title">{data.title}</div>
										</Card>
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

export default BoardsPage;
