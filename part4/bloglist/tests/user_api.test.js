const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
// const { application } = require('express')
const User = require('../models/user');
const helper = require('./test_helper');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'root',
      passwordHash,
    });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const initialUsers = await helper.usersInDb();

    const newUser = {
      username: 'Pequeno',
      name: 'Élio Maia',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const finalUsers = await helper.usersInDb();
    expect(finalUsers).toHaveLength(initialUsers.length + 1);

    const usernames = finalUsers.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails if username is missing', async () => {
    const initialUsers = await helper.usersInDb();

    const newUser = {
      name: 'Élio Maia',
      password: 'password',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username and password are required')

    const finalUsers = await helper.usersInDb();
    expect(finalUsers).toHaveLength(initialUsers.length);
  });
  
  test('creation fails if password is missing', async () => {
    const initialUsers = await helper.usersInDb();

    const newUser = {
      username: 'Pequeno',
      name: 'Élio Maia',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username and password are required')

    const finalUsers = await helper.usersInDb();
    expect(finalUsers).toHaveLength(initialUsers.length);
  });

  test('creation fails if username is shorter than 3 characters', async () => {
    const initialUsers = await helper.usersInDb();

    const newUser = {
      username: 'Pe',
      name: 'Élio Maia',
      password: 'password'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username and password must be at least 3 characters long')

    const finalUsers = await helper.usersInDb();
    expect(finalUsers).toHaveLength(initialUsers.length);
  });
  
  test('creation fails if password is shorter than 3 characters', async () => {
    const initialUsers = await helper.usersInDb();
  
    const newUser = {
      username: 'Pequeno',
      name: 'Élio Maia',
      password: 'pa'
    };
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  
    expect(result.body.error).toContain('username and password must be at least 3 characters long')
  
    const finalUsers = await helper.usersInDb();
    expect(finalUsers).toHaveLength(initialUsers.length);
  });
});
