/*
*
*	Comment Resource Tests
*
*/

const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();

const server = require('../dist/index.js');

// Initialise Chai HTTP requests
chai.use(chaiHTTP);


describe(
`
  ===================
  GENERAL TESTS 
  ===================
`, function() {

	it('Should return a 200 OK from a GET on the healthcheck route', function(done) {
		chai.request(server)
			.get('/healthcheck')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	})

});
