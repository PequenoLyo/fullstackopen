const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404);
  }
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id); // Should be populated??
  if (blog) {
    response.json(blog);
  } else {
    response.status(404);
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = request.user

  const blog = await new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }).populate('user', { username: 1, name: 1 });

  console.log(blog);

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
  });
  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = request.user
  
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'unauthorized operation' });
  }
});

module.exports = blogsRouter;
