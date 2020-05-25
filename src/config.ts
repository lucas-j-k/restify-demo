/*
*
*	Config for environments
*
*/

const configInterface = {
	
};

const config = {
	development: {
		dbName: 'database.sqlite',
		port: 8000,
	},
	testing: {
		dbName: 'test-database.sqlite',
		port: 3000,
	}
};

export default config;

