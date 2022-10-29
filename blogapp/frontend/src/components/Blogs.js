import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return blogs.map((blog) => (
    <div style={blogStyle} key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  ));
};

export default Blogs;
