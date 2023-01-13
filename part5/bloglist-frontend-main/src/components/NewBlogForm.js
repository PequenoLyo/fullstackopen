import { useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleNewBlogInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleCreateNewBlog = (event) => {
    event.preventDefault()
    createNewBlog(newBlog.title, newBlog.author, newBlog.url)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={handleCreateNewBlog}>
      <div>
        title
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleNewBlogInputChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleNewBlogInputChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleNewBlogInputChange}
        />
      </div>
      <button id="btnCreateNewBlog" type="submit">
        create
      </button>
    </form>
  )
}

export default NewBlogForm
