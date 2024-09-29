import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { useContext, useEffect, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { truncateTo100Chars, timeAgo } from "../utility";
import { Link } from "react-router-dom";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const { showAlert } = useContext(AlertContext);

  const getUser = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    // console.log(accessToken);
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        // console.log(decoded);
        const res = await api.get(`/api/user/${decoded.user_id}/`);
        if (res.status === 200) {
          setBlogs(res.data.posts);
          // showAlert("User details fetched successfully", "success");
        } else {
          showAlert("Error fetching user details", "danger");
        }
      } catch (error) {
        showAlert("Error fetching user details", "danger");
        console.error("Error decoding token:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/api/posts/${id}/`);
      if (res.status === 204) {
        showAlert("Blog deleted successfully", "success");
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } else {
        showAlert("Error deleting blog", "danger");
      }
    } catch (error) {
      showAlert("Error deleting blog", "danger");
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
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
                  <Card.Title>
                    <div className="d-flex justify-content-between m-2">
                      {blog.title}
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => handleDelete(blog.id)}
                      ></i>
                    </div>
                  </Card.Title>
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

export default Profile;
