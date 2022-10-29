import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Blog = ({ handleLike }) => {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;

  const incrementLike = (blog) => {
    handleLike(blog);
  };

  /* const remove = async () => {
    handleRemove(blog)
  }; */
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  } else {
    return (
      <div>
        <h2>{blog.title}</h2>
        <div>
          <a href={`//${blog.url}`}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <button onClick={() => incrementLike(blog)} className="likeButton">
            like
          </button>
        </div>
        <div>added by {blog.author}</div>
      </div>
    );
  }
};

export default Blog;
