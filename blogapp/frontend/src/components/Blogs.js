import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = ({ handleRemove, handleLike }) => {
  const blogs = useSelector((state) => state.blogs);
  return blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} handleRemove={handleRemove} handleLike={handleLike} />
  ));
};

export default Blogs;
