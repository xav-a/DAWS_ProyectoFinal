module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');

    // Create a new Post
    app.post('/new/post', posts.create);

    // Retrieve all Posts
    app.get('/show/posts/:userId', posts.findAll);

    // Retrieve a single Post with postId
    app.get('/show/post/:postId', posts.findOne);

    // Update a Post with postId
    app.put('/edit/post/:postId', posts.update);

    // Delete a Post with postId
    app.delete('/delete/post/:postId', posts.delete);
}