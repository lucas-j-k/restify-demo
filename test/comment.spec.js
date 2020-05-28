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


	describe('POST /v1/comments', function() {
		it('should fail when user_id is not provided', function(done) {
			chai.request(server)
			.post('/v1/comments')
			.set('content-type', 'application/json')
			.send({
				post_id: 1,
				content: 'This comment was added by a test',
			})
			.end(function(err, res) {
				res.should.have.status(400);
				done();
			})		
		});

		it('should fail when post_id is not provided', function(done) {
			chai.request(server)
			.post('/v1/comments')
			.set('content-type', 'application/json')
			.send({
				user_id: 1,
				content: 'This comment was added by a test',
			})
			.end(function(err, res) {
				res.should.have.status(400);
				done();
			})		
		});

		it('should fail when content is not provided', function(done) {
			chai.request(server)
			.post('/v1/comments')
			.set('content-type', 'application/json')
			.send({
				user_id: 1,
				post_id: 1,
			})
			.end(function(err, res) {
				res.should.have.status(400);
				done();
			})		
		});

		it('should insert a new comment record to the database', function(done) {
			chai.request(server)
			.post('/v1/comments')
			.set('content-type', 'application/json')
			.send({
				user_id: 1,
				post_id: 1,
				content: 'This comment was added by a test',
			})
			.end(function(err, res) {
				res.should.have.status(200);
				done();
			})		
		});

		it('should be able to find the new comment in the database by ID', function(done){
			chai.request(server)
			.get('/v1/comments/6')
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.have.property('data');
				res.body.data.should.be.a('object');
				res.body.data.id.should.equal(6);
				done();
			})
		});
	});

	describe('UPDATE /v1/comments/{id}', function(done) {

		it('should fail with 404 when comment does not exist', function(done) {
			chai.request(server)
			.put('/v1/comments/200')
			.set('content-type', 'application/json')
			.send({
				user_id: 1,
				post_id: 1,
				content: 'This comment has been updated by a test',
			})
			.end(function(err, res) {
				res.should.have.status(404);
				done();
			})		
		});

		it('should fail with 400 when id parameter is not an integer', function(done) {
			chai.request(server)
			.put('/v1/comments/six')
			.set('content-type', 'application/json')
			.send({
				user_id: 1,
				post_id: 1,
				content: 'This comment has been updated by a test',
			})
			.end(function(err, res) {
				res.should.have.status(400);
				done();
			})		
		});

		it('should fail when content is not provided', function(done) {
			chai.request(server)
			.put('/v1/comments/6')
			.set('content-type', 'application/json')
			.send({
				user_id: 1,
				post_id: 1,
			})
			.end(function(err, res) {
				res.should.have.status(400);
				done();
			})		
		});

		it('should update the comment content field', function(done) {
			chai.request(server)
			.put('/v1/comments/6')
			.set('content-type', 'application/json')
			.send({
				content: 'This comment has been updated by a test',
			})
			.end(function(err, res) {
				res.should.have.status(200);
				done();
			})		
		});

		it('should find the comment content has been updated', function(done) {
			chai.request(server)
			.get('/v1/comments/6')
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.data.should.be.a('object');
				res.body.data.content.should.equal('This comment has been updated by a test');
				done();
			})		
		});
	});

	describe('DELETE /v1/comments/{id}', function(done) {

		it('should fail with 404 when comment does not exist', function(done) {
			chai.request(server)
			.delete('/v1/comments/200')
			.end(function(err, res) {
				res.should.have.status(404);
				done();
			})
		});

		it('should fail with 400 when id parameter is not an integer', function(done) {
			chai.request(server)
			.delete('/v1/comments/six')
			.end(function(err, res) {
				res.should.have.status(400);
				done();
			})
		});

		it('should delete the comment record from database', function(done) {
			chai.request(server)
			.delete('/v1/comments/6')
			.end(function(err, res) {
				res.should.have.status(200);
				done();
			})
		});

		it('should not be able to find the deleted comment', function(done) {
			chai.request(server)
			.delete('/v1/comments/6')
			.end(function(err, res) {
				res.should.have.status(404);
				done();
			})
		});
	});


});
