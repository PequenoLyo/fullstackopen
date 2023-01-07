import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [notificationContent, setNotificationContent] = useState([null, null]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    console.log('Notification useEffect triggered');
    if (!(notificationContent[1] == null)) {
      console.log('Fire 5 second timer');

      const timer = setTimeout(() => {
        setNotificationContent([null, null]);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notificationContent]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log('Logging in as user:', username, 'password:', password);
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotificationContent([
        'success',
        `${user.name} has logged in successfully`,
      ]);
    } catch (exception) {
      setNotificationContent([
        'error',
        `wrong credentials`,
      ]);
      console.log('Wrong credentials');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser('');
  };

  const createNewBlog = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(newBlog));
      setNotificationContent([
        'success',
        `a new blog with title '${newBlog.title}' by ${newBlog.author} has been added`,
      ]);
    } catch (exception) {
      setNotificationContent([
        'error',
        `error creating blog`,
      ]);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          className={notificationContent[0]}
          message={notificationContent[1]}
        />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification
          className={notificationContent[0]}
          message={notificationContent[1]}
        />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <h2>create new</h2>
        <NewBlogForm createNewBlog={createNewBlog} />

        <h2>blog list</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
