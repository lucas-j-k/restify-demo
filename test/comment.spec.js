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
  RESOURCE - COMMENTS 
  ===================
`, function() {
	describe('GET /v1/comments', () =>{
		// Get all Comments with no query params
		it('should fail with no query params', (done) => {
			chai.request(server)
				.get('/v1/comments')
				.end((err, res) => {
					res.should.have.status(400);
					done();
				})
		});

		it('should fail when both user and post IDs are provided in query', (done) => {
			chai.request(server)
				.get('/v1/comments?user_id=1&post_id=1')
				.end((err, res) => {
					res.should.have.status(400);
					done();
				})
		});

		it('should return comments from a specific user', (done) => {
			chai.request(server)
			.get('/v1/comments?user_id=1')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('data');
				res.body.data.should.be.a('array');
				res.body.data.forEach(comment => {
					comment.should.have.property('content');
					comment.user_id.should.equal(1);
				});
				done();
			});
		});

		it('should return comments associated with a specific post', (done) => {
			chai.request(server)
			.get('/v1/comments?post_id=1')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('data');
				res.body.data.should.be.a('array');
				res.body.data.forEach(comment => {
					comment.should.have.property('content');
					comment.post_id.should.equal(1);
				});
				done();
			});
		});


	});


	describe('GET /v1/comments/{id}', () => {
		it('should return a single comment object', (done) => {
			chai.request(server)
			.get('/v1/comments/1')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('data');
				res.body.data.should.be.a('object');
				res.body.data.should.have.property('content');
				res.body.data.should.have.property('id');
				res.body.data.id.should.equal(1);
				done();
			});
		});

		it('should return a 404 when resource is not found', function(done) {
			chai.request(server)
			.get('/v1/comments/200')
			.end(function(err, res) {
				res.should.have.status(404);
				done();
			})
		});

		it('should return a 400 when ID parameter is not an integer', function(done) {
			chai.request(server)
			.get('/v1/comments/one')
			.end(function(err, res) {
				res.should.have.status(400);
				done();
			})
		});

	});

});
