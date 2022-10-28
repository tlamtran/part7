import { useState } from "react";
import PropTypes from "prop-types";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false);

  const showIfTrue = { display: visible ? "" : "none" };
  const showRemoveButton = {
    display: blog.user.name === blog.user.name ? "" : "none",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const incrementLike = () => {
    handleLike(blog)
  };

  const remove = async () => {
    handleRemove(blog)
  };

  return (
    <div style={blogStyle} className="blogContent">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} id="show-button">
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showIfTrue} className="hiddenContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={incrementLike} className="likeButton">
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button style={showRemoveButton} onClick={remove}>
          remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
