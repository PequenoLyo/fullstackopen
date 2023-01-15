import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'



test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()
  
  const component = render(<NewBlogForm createNewBlog={mockHandler} />)

  const titleInput = component.container.querySelector("input[name='title']")
  const authorInput = component.container.querySelector("input[name='author']")
  const urlInput = component.container.querySelector("input[name='url']")
  const buttonCreateNewBlog = screen.getByText('create')

  await user.type(titleInput, 'Test title')
  await user.type(authorInput, 'Test author')
  await user.type(urlInput, 'www.test.com')
  await user.click(buttonCreateNewBlog)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe('Test title')
  expect(mockHandler.mock.calls[0][1]).toBe('Test author')
  expect(mockHandler.mock.calls[0][2]).toBe('www.test.com')  
})
