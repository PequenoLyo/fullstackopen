import { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateBlogLikes(blog.id, blogToUpdate)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      <div>
        <span>{blog.title} - </span>
        <span>{blog.author}</span>{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>

          <div>
            Likes: {blog.likes} <button onClick={handleLike}>like</button>
          </div>

          {blog.user && <div>{blog.user.name}</div>}

          <button onClick={handleDelete}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
