import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import React from "react";
import Form from "react-bootstrap/Form";
import api from "../api";

const Comment = ({ postId, name, comments, setComments }) => {
  const [show, setShow] = useState(false);
  const [textValue, setTextValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/comments/", {
        body: textValue,
        post: postId,
      });
      if (res.status === 201) {
        // setComments(comments.concat(res.data));
        setComments([res.data, ...comments]);
        setTextValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="me-2 mt-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Comments</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicComment">
              <Form.Control
                type="text"
                placeholder="Comment"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="my-3">
              Submit
            </Button>
          </Form>
          {comments.length === 0 ? (
            <p>No Comments</p>
          ) : (
            comments.map((comment, index) => {
              return (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <Card.Text>{comment.body}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Comment;
