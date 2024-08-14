import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import AlertContext from "../context/alert/AlertContext";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (localStorage.getItem("access")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await api.post("/api/user/register/", {
        username,
        email,
        password,
      });
      if (res.status === 201) {
        const result = await api.post("/api/token/", {
          username,
          password,
        });
        showAlert("Registration Successful", "success");
        if (result.status === 200) {
          localStorage.setItem("access", result.data.access);
          localStorage.setItem("refresh", result.data.refresh);
          navigate("/");
        } else {
          navigate("/login");
        }
      } else {
        console.log(res);
        showAlert("Registration Failed", "danger");
      }
    } catch (error) {
      console.log(error);
      showAlert("Registration Failed", "danger");
    }
    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={5}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={5}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      {loading && (
        <div className="text-center mt-3">
          <Loading />
        </div>
      )}
    </Container>
  );
};

export default RegistrationPage;
