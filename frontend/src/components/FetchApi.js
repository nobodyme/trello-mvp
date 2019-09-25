import React from 'react';
import axios from '../utils/axios';

class FetchApi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: null,
			apiData: null
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.forceRefresh !== this.props.forceRefresh) {
			this.fetchData();
		}
	}

	async fetchData() {
		try {
			this.setState({ loading: true });
			const { api } = this.props;
			const { data } = await axios.get(api);
			this.setState({ loading: false, apiData: data });
		} catch (error) {
			this.setState({ loading: false, error: error.message });
		}
	}

	render() {
		const { error, loading, apiData } = this.state;
		return this.props.children(error, loading, apiData);
	}
}

export default FetchApi;
