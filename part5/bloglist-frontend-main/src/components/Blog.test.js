import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders the blog title and author, but does not render the URL or number of likes by default', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'www.test.com',
    likes: 69,
    user: 'randomId',
  }
  
  const { container } = render(<Blog blog={blog}/>)

  expect(container.querySelector('.title')).toHaveTextContent(blog.title)  
  expect(container.querySelector('.author')).toHaveTextContent(blog.author)  
})