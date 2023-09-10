import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Login() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const inputRef = useRef();

  if (localStorage.getItem("user")) {
    window.location.href = "/debts";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      navigate("/debts");
      localStorage.setItem("user", inputRef.current.value);
    }
    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      className="container content d-flex justify-content-center align-items-center"
      onSubmit={handleSubmit}
    >
      <Row className="mini-container">
        <div className="text-center">
          <h1>Login</h1>
          <p>enter any email and password!</p>
        </div>
        <Form.Group
          as={Col}
          md="12"
          controlId="validationCustom01"
          className="my-1"
        >
          <Form.Control
            required
            type="email"
            ref={inputRef}
            placeholder="Email"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please fill!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          controlId="validationCustom01"
          className="my-1"
        >
          <Form.Control required type="password" placeholder="Password" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please fill!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          controlId="validationCustom01"
          className="my-1"
        >
          <Button type="submit" className="w-100" variant="primary">
            Submit
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
}

export default Login;
