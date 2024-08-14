import React, { useEffect, useState } from "react";
import api from "../api";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { timeAgo, truncateTo100Chars } from "../utility";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const res = await api.get("/api/posts/");
      if (res.status === 200) {
        setBlogs(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-5">
      <Row xs={1} className="g-4">
        {blogs.length !== 0 ? (
          blogs.map((blog) => (
            <Col key={blog.id}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>
                    {truncateTo100Chars(blog.body)}
                    <Button as={Link} to={`/blog/${blog.id}`} variant="link">
                      read more
                    </Button>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <div className="mx-2 d-flex justify-content-between">
                    {timeAgo(blog.created)}
                    <Card.Text>{blog.owner}</Card.Text>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <h2 className="text-center">No blogs Found</h2>
        )}
      </Row>
    </div>
  );
};

export default Blogs;
