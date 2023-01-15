import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'www.test.com',
  likes: 69,
  user: 'randomId',
}

let component
const mockHandler = jest.fn()

beforeEach(() => {    
  component = render(<Blog blog={blog} updateBlogLikes={mockHandler}/>)
})

test('renders the blog title and author, but does not render the URL or number of likes by default', () => {
  screen.debug()
  expect(component.container.querySelector('.title')).toHaveTextContent(blog.title)  
  expect(component.container.querySelector('.author')).toHaveTextContent(blog.author)
})

test('blog URL and likes are shown when the button is clicked', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  expect(component.container.querySelector('.likes')).toHaveTextContent(`Likes: ${blog.likes}`)
  expect(component.container.querySelector('.url')).toHaveTextContent(blog.url)
})

test('like event handler is called twice if the like button is called twice', async () => {
 
  const user = userEvent.setup()
  const buttonShowHide = screen.getByText('show')
  await user.click(buttonShowHide)
  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)
  await user.click(buttonLike)
  
  expect(mockHandler.mock.calls).toHaveLength(2)
})