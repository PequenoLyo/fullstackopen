const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  let currentFavoriteBlog = {title: '', author: '', likes: -1};
  blogs.forEach((blog) => {
    // console.log(blog)
    if (blog.likes > currentFavoriteBlog.likes) {
      currentFavoriteBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }     
    }
  });
  return currentFavoriteBlog
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
