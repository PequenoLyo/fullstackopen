import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';

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
      setNotificationContent(['error', `wrong credentials`]);
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
      setNotificationContent(['error', `error creating blog`]);
    }
  };

  const updateBlogLikes = async (id, updatedBlog) => {
    try {
      const newBlog = await blogService.update(id, updatedBlog);
      const newBlogs = blogs.map((blog) => (blog.id === id ? newBlog : blog));
      setBlogs(newBlogs);
    } catch (exception) {
      setNotificationContent(['error', 'error updating blog likes']);
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
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
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
        <Togglable buttonLabel="new blog">
          <NewBlogForm createNewBlog={createNewBlog} />
        </Togglable>

        <h2>blog list</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} />
          ))}
      </div>
    );
  }
};

export default App;
