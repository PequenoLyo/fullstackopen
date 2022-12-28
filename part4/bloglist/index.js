const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const { findByIdAndDelete } = require('../../part3/phonebook/models/person')
mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.get('/api/blogs/:id', (request, response) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if(blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.put('/api/blogs/:id', (request, response) => {
  const { title, author, url, likes } = request.body

  Blog
    .findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog)
    })
})

app.delete('/api/blogs/:id', (request, response) => {
  Blog
    .findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})