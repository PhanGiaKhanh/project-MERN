import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // contexts
  const { loginUser } = useContext(AuthContext);

  // Router
  const navigate = useNavigate();

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    // Tránh submit theo form HTML
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        navigate("/dashboard");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
