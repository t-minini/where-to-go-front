import axios from 'axios';

const apiURLs = {
	development: 'http://localhost:4000',
	production: 'https://project-three-tulio.herokuapp.com',
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

axios.interceptors.request.use((request) => {
	console.log('Starting Request', JSON.stringify(request, null, 2));
	return request;
});

api.interceptors.request.use((config) => {
	const loggedInUserJSON = localStorage.getItem('loggedInUser');

	const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

	if (parseLoggedInUser.token) {
		config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
	}

	return config;
});

export { api };
