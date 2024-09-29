import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  let location = useLocation();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/addpost"}>
              Add Post
            </Nav.Link>
            <Nav.Link as={Link} to={"/myposts"}>
              My Posts
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {location.pathname === "/login" ? (
          <Button as={Link} to={"/register"} variant="outline-success">
            Register
          </Button>
        ) : location.pathname === "/register" ? (
          <Button as={Link} to={"/login"} variant="outline-success">
            Login
          </Button>
        ) : (
          <Button as={Link} to={"/logout"} variant="outline-success">
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
