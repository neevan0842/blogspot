import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";
import api from "../api";

const AddBlogPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/posts/", { title, body });
      if (res.status === 201) {
        showAlert("Post added successfully", "success");
        navigate("/");
      } else {
        showAlert("Failed to add post", "danger");
      }
    } catch (error) {
      showAlert("Failed to add post", "danger");
      console.log(error);
    }
  };

  return (
    <Container className="my-4">
      <h2>Add New Blog Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className="my-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={5}
            required
          />
        </Form.Group>

        <Form.Group controlId="formbody" className="my-3">
          <Form.Label>body</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            minLength={10}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="my-2">
          Post
        </Button>
      </Form>
    </Container>
  );
};

export default AddBlogPost;
