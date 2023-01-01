const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');
const blogList = require('../utils/test_bloglist');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogList.listWithManyBlogs);
}, 10000);

describe('GET tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blogs have id property named id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    const idArray = response.body.map((blog) => blog.id);
    idArray.forEach((id) => expect(id).toBeDefined());
  });
});

describe('POST tests', () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = await new User({
      username: 'Pequeno',
      name: 'élio',
      password: passwordHash,
    }).save();

    const userForToken = {
      username: 'Pequeno',
      id: user.id,
    };
    return (token = jwt.sign(userForToken, config.SECRET));
  });

  test('posting a new blog by an authorized user increases the total number of blogs by 1 and saves a blog with the correct title', async () => {
    const initialBlogs = await api.get('/api/blogs');

    const newBlog = {
      title: 'test title',
      // author: 'test author',
      url: 'test url',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await api.get('/api/blogs');
    const newBlogsTitles = newBlogs.body.map((blog) => blog.title);

    expect(newBlogs.body).toHaveLength(initialBlogs.body.length + 1);
    expect(newBlogsTitles).toContain('test title');
  });

  test('likes default to 0 if ommitted', async () => {
    const newBlog = {
      title: 'test title for default likes',
      // author: 'test author',
      url: 'test url',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await api.get('/api/blogs');
    const newBlogsTitles = newBlogs.body.map((blog) => blog.title);

    expect(newBlogs.body[newBlogs.body.length - 1].likes).toEqual(0);
  });

  test('missing title returns a 400 Bad Request error', async () => {
    const newBlog = {
      // author: 'test author',
      url: 'test url',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('missing url returns a 400 Bad Request error', async () => {
    const newBlog = {
      title: 'test title',
      // author: 'test author',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe('deletion of a note', () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = await new User({
      username: 'Pequeno',
      name: 'élio',
      password: passwordHash,
    }).save();

    const userForToken = {
      username: 'Pequeno',
      id: user.id,
    };
    token = jwt.sign(userForToken, config.SECRET);

    const newBlog = {
      title: 'test blog for deletion',
      url: 'www.testurl.com',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    return token;
  });

  test('succeeds with status code 204 if id is valid', async () => {
    const initialBlogs = await api.get('/api/blogs');
    const blogToDelete = initialBlogs.body[initialBlogs.body.length - 1];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const newBlogs = await api.get('/api/blogs');
    expect(newBlogs.body).toHaveLength(initialBlogs.body.length - 1);
  });
});

describe('updating a note', () => {
  test('succeeds with status code 200 if the update is successful', async () => {
    const initialBlogs = await api.get('/api/blogs');
    const blogToUpdate = initialBlogs.body[initialBlogs.body.length - 1];

    const updatedBlog = {
      title: 'test updated title',
      author: 'test author',
      url: 'test url',
      likes: 5,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const newBlogs = await api.get('/api/blogs');
    expect(newBlogs.body[newBlogs.body.length - 1].title).toBe(
      'test updated title'
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
