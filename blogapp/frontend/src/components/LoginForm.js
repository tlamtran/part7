import { useState } from "react";
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    await handleLogin(credentials);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Form onSubmit={login}>
        <div>
          username
          <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" id="login-button">
          login
        </Button>
      </Form>
    </div>
  );
};


export default LoginForm;
