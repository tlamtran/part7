import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;

  if (!users) {
    return null;
  } else {
    const user = users.find(user => user.id === id)
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        {user.blogs.map(blog => <li key={blog.id} style={{ paddingLeft: 20 }}>{blog.title}</li>)}
      </div>
    )
  }
};

export default User;
