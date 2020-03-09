## Restify Demo

+ Restify
+ SQLite3
+ Typescript

### Running the project

+ Run ```npm run migrate``` to build a local SQLite database and seed dummy data for users, comments and posts
+ Run ```npm run dev``` to start the server
+ Routes will be available at localhost:8000

### Routes

#### Posts
+ GET ```/v1/posts``` : Get all posts
+ GET ```/v1/posts/{id}``` : Get post by ID
+ POST ```/v1/posts``` : Create post
+ PUT ```/v1/posts/{id}``` : Update post by ID
+ DELETE ```/v1/posts/{id}``` : Delete post by ID

#### Comments
+ GET ```/v1/comments?user_id={id}``` : Get all comments by user ID
+ GET ```/v1/comments?post_id={id}``` : Get all comments by post ID
+ GET ```/v1/comments/{id}``` : Get comment by ID
+ POST ```/v1/comments``` : Create comment
+ PUT ```/v1/comments/{id}``` : Update comment by ID
+ DELETE ```/v1/comments/{id}``` : Delete comment by ID
