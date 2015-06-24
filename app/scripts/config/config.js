var config = config || {};

config.development = {
	app: 'child-sponsorship-web-development',

	api: {
		url: 'http://localhost:5000/api/v1'
	}
};

config.production = {
	app: 'child-sponsorship-web',

	api: {
		url: 'https://child-sponsorship-api.herokuapp.com/api/v1'
	}
};