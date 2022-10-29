import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return blogs.map((blog) => (
    <ListGroup key={blog.id}>
      <ListGroupItem>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </ListGroupItem>
    </ListGroup>
  ));
};

export default Blogs;
