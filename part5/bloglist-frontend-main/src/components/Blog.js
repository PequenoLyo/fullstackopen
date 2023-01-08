import { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  console.log(blog);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog">
      <div>
        <span className="blogTitle">{blog.title} - </span>
        <span classname="blogAuthor">{blog.author}</span>{' '}
        <button id="buttonView" onClick={toggleVisibility}>
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible && (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
        </div>
      )}
    </div>
  );
};

export default Blog;
