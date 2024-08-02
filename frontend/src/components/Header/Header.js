import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = ({setSearch}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    // history("/");
  };
  useEffect(()=>{},[userInfo]);
  return (
    <Navbar expand="lg" bg="primary" varient="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Happy Notes</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            {userInfo && (
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            )}
          </Nav>

          <Nav>
            {userInfo ? (
              <>
                <Nav.Link href="/mynotes">
                  <Link to="/mynotes">My Notes</Link>
                </Nav.Link>

                <NavDropdown title={`${userInfo?.name}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
