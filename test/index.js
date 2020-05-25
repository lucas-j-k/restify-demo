/*
*
*	Tests
*
*/

const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();

const server = require('../dist/index.js');
const runMigrations = require('../dist/db/migrations/index.js');

// Initialise Chai HTTP requests
chai.use(chaiHTTP);


/*
*	Healthcheck
*/
describe('HEALTHCHECK', function() {
	it('Should return a 200 OK from a GET on the healthcheck route', function(done) {
		chai.request(server)
			.get('/healthcheck')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	})
})


/*
*	Posts Tests
*/
describe('RESOURCE - POSTS', () => {


	describe('GET /v1/posts', () => {
		// Get all Posts
		it('should return an array of posts', (done) => {
			chai.request(server)
				.get('/v1/posts')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.be.a('array');
					res.body.data.forEach(post => {
						post.should.have.property('id');
						post.should.have.property('content');
						post.should.have.property('user_id');
						post.should.have.property('username');
						post.should.have.property('content');
						post.content.should.be.a('string');
					});
					done();
				})
		});
	});

	describe('GET /v1/posts/{id}', () => {

		it('should return a single post object, with the id property matching the url parameter', (done) => {
			chai.request(server)
				.get('/v1/posts/1')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('title');
					res.body.data.should.have.property('id');
					res.body.data.id.should.equal(1);
					res.body.data.should.have.property('user_id');
					res.body.data.user_id.should.equal(1);
					done();
				})
		});

		it('should fail with a 404 when resource is not found', function(done){
			chai.request(server)
			.get('/v1/posts/1000')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
		});

		it('should fail with a 400 bad request if the ID parameter is not an integer', function(done){
			chai.request(server)
			.get('/v1/posts/one')
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

	});

	describe('POST /v1/posts', function() {
		it('should insert a new post record to the database');
		it('should fail when user_id is missing');
		it('should fail when title is missing');
		it('should fail when content is missing');
	});

	describe('UPDATE /v1/posts/{id}', function() {
		it('should update title field on an existing post record');
		it('should fail with a 404 when the targeted resource does not exist');
		it('should fail with a 400 when the id parameter is not an integer');
		it('should fail when title is missing from body');		
		it('should fail when content is missing from body');
	});

	describe('DELETE /v1/posts', function() {
		it('should successfully delete the targeted post record');
		it('should fail with a 404 when targeted record does not exist');
		it('should fail with a 400 when the id parameter is not an integer');
		it('should fail when title is missing');
	});




});



/*
*	Comments Tests
*/
describe('RESOURCE - COMMENTS', () => {

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
	});


	describe('GET /v1/comments/{id}', () =>{
		// Get single comment by comment ID
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
	});

	// Return 404 error when resource doesn't exist
	it('should return a 404 when resource is not found');

	// Reject request if the ID in the url is not an integer
	it('should return a 400 bad request if the ID parameter is not an integer');

	describe('GET /v1/comments?user_id={id}', () =>{
		// Get all Comments by user Id
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

	});

	describe('GET /v1/comments?post_id={id}', () =>{
		// Get all Comments by post Id
		it('should return comments associated with a specific post', (done) => {
			chai.request(server)
				.get('/v1/comments?post_id=10')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					res.body.data.should.be.a('array');
					res.body.data.forEach(comment => {
						comment.should.have.property('post_id');
						comment.should.have.property('content');
						comment.post_id.should.equal(10);
					});
					done();
				});
		});
	});


	describe('GET /v1/comments?post_id={id}&user_id={id}', () =>{
		// Test passing user and post params
		it('should fail if both user and post filters are passed in params', (done) => {
			chai.request(server)
				.get('/v1/comments?post_id=10&user_id=7')
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});



});