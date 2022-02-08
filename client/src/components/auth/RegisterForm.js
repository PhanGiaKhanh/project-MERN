import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <>
      <Form className="my-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
