import { useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

import { useDispatch, useSelector } from "react-redux";
import { setBlogs, addBlog, removeBlog, like } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { setMessage } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      );
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    blogService.setToken(null);
    dispatch(setUser(null));

    dispatch(setMessage("logout successful"));
    setTimeout(() => {
      dispatch(setMessage(null));
    }, 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));

      dispatch(setMessage("login successful"));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    } catch (exception) {
      dispatch(setMessage("Wrong username or password"));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  const handleCreate = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const response = await blogService.create(newBlog);
    dispatch(addBlog(response))

    dispatch(
      setMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added successfully`
      )
    );
    setTimeout(() => {
      dispatch(setMessage(null));
    }, 5000);
  };

  const handleLike = async blog => {
    dispatch(like(blog.id))
    await blogService.incrementLike(blog)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog);
      dispatch(removeBlog(blog.id))

      dispatch(
        setMessage(
          `${blog.title} by ${blog.author} was removed successfully`
        )
      );
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  if (user) {
    return (
      <div>
        <Notification />
        <h2>blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Toggleable buttonLabel="add new blog" ref={blogFormRef}>
          <BlogForm handleCreate={handleCreate} user={user} />
        </Toggleable>
        <Blogs handleRemove={handleRemove} handleLike={handleLike} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }
};

export default App;
