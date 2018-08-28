module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  // Create a new Post
  app.post("/new/post", posts.create);

  // Retrieve all Posts
  app.get("/show/posts/", posts.findAllPosts);

  // Retrieve all Posts by userId
  app.get("/show/posts/:userId", posts.findAll);
  
  // Retrieve user posts counts
  app.get("/show/counts", posts.findFreqs);

  // Retrieve a single Post with postId
  app.get("/show/post/:postId", posts.findOne);

  // Update a Post with postId
  app.put("/edit/post/:postId", posts.update);

  // Delete a Post with postId
  app.delete("/delete/post/:postId", posts.delete);
};
