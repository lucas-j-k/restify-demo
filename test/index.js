/*
*
*	Tests
*
*/

const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();

const server = require('../dist/index.js');


// Initialise Chai HTTP requests
chai.use(chaiHTTP);


/*
*	Healthcheck
*/
describe('GET Healthcheck', () => {
	it('Should return a 200 OK from the healthcheck route', (done) => {
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
					done();
				})
		});
	});

	describe('GET /v1/posts/{id}', () => {
		// Get single Post
		it('should return a single post object', (done) => {
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