import { Component } from 'react';
import axios from '../utils/axios';

class FetchApi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: null,
			apiData: null
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps, prevState) {
		// force refetch on say form submission
		if (prevProps.forceRefetch !== this.props.forceRefetch) {
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
		const { error, apiData, loading } = this.state;
		return this.props.children(apiData, error, loading);
	}
}

export default FetchApi;
