import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap"

const Users = () => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }
  else {
    return (
      <div>
        <h2>Users</h2>
        <Table striped>
          <tbody>
            <tr>
              <td></td>
              <td style={{ fontWeight: "bold" }}>blogs created</td>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default Users;
