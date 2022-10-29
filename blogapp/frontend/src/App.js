import { useEffect, useRef } from "react";

import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";

import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import Users from "./components/Users";
import User from "./components/User";

import blogService from "./services/blogs";
import loginService from "./services/login";
import userServices from "./services/users";

import { useDispatch, useSelector } from "react-redux";
import { setBlogs, addBlog, like, addComment } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { setUsers } from "./reducers/usersReducer";
import { setMessage } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      );
    userServices.getAll().then((users) => dispatch(setUsers(users)));
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
    navigate("/login");

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
      navigate("/");

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
    dispatch(addBlog(response));

    dispatch(
      setMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added successfully`
      )
    );
    setTimeout(() => {
      dispatch(setMessage(null));
    }, 5000);
  };

  const handleLike = async (blog) => {
    dispatch(like(blog.id));
    await blogService.incrementLike(blog);
  };

  /* const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog);
      dispatch(removeBlog(blog.id));

      dispatch(
        setMessage(`${blog.title} by ${blog.author} was removed successfully`)
      );
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  }; */

  const handleComment = async (blog) => {
    dispatch(addComment(blog))
  }

  const Home = () => {
    return (
      <div>
        <Toggleable buttonLabel="add new blog" ref={blogFormRef}>
          <BlogForm handleCreate={handleCreate} user={user} />
        </Toggleable>
        <Blogs />
      </div>
    );
  };

  const LoggedInInfo = () => {
    return (
      <div>
        <Link to={"/"}>blogs</Link> <Link to={"/users"}>users</Link>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      </div>
    );
  };

  const Login = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  };

  return (
    <div className="container">
      <div>
        {user ? <LoggedInInfo /> : null}
        <Notification />
        <h1>blog app</h1>
      </div>
      <div>
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog handleLike={handleLike} handleComment={handleComment} />} />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate replace to="/login" />}
          />
          <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
