const listHelper = require('../utils/list_helper');
const testBlogList = require('../utils/test_bloglist');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

const listWithOneBlog = testBlogList.listWithOneBlog

const listWithManyBlogs = testBlogList.listWithManyBlogs

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });

  test('of a bigger list is correctly detected', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('most blogs', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
  test('of a bigger list is correctly detected', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  })
})

describe('most likes', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })
  test('of a bigger list is correctly detected', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  })
})


 
