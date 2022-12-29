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
    return {};
  }
  let currentFavoriteBlog = { title: '', author: '', likes: -1 };
  blogs.forEach((blog) => {
    // console.log(blog)
    if (blog.likes > currentFavoriteBlog.likes) {
      currentFavoriteBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });
  return currentFavoriteBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let authorList = [];
  let topAuthor = {author: '', blogs: -1};

  blogs.forEach((blog) => {
    // Check if the author of blog is in the authorList
    if (authorList.some(uniqueAuthor => {
      return blog.author === uniqueAuthor.author
    })) {
      // If yes, increase the blog count
      authorList.forEach(uniqueAuthor => {
        if (blog.author === uniqueAuthor.author) {
          uniqueAuthor.blogs++
        }
      })
    } else {
      // If not, create a new uniqueAuthor
      authorList.push({
        author: blog.author,
        blogs: 1
      })
    }
  });

  console.log(authorList)

  authorList.forEach(uniqueAuthor => {
    if (uniqueAuthor.blogs > topAuthor.blogs) {
      topAuthor = {
        author: uniqueAuthor.author,
        blogs: uniqueAuthor.blogs
      }
    }
  })
  
  return topAuthor
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let authorList = [];
  let topAuthor = {author: '', likes: -1};

  blogs.forEach((blog) => {
    // Check if the author of blog is in the authorList
    if (authorList.some(uniqueAuthor => {
      return blog.author === uniqueAuthor.author
    })) {
      // If yes, increase the like count
      authorList.forEach(uniqueAuthor => {
        if (blog.author === uniqueAuthor.author) {
          uniqueAuthor.likes = uniqueAuthor.likes + blog.likes
        }
      })
    } else {
      // If not, create a new uniqueAuthor
      authorList.push({
        author: blog.author,
        likes: blog.likes
      })
    }
  });

  console.log(authorList)

  authorList.forEach(uniqueAuthor => {
    if (uniqueAuthor.likes > topAuthor.likes) {
      topAuthor = {
        author: uniqueAuthor.author,
        likes: uniqueAuthor.likes
      }
    }
  })
  
  return topAuthor
};



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
