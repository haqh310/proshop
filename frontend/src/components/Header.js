import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { logout } from "../actions/userAction";
import SearchBox from "./SearchBox"

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="mb-3">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <SearchBox/>
         
          <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
            <Nav className="mr-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" className="mx-0">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="far fa-address-card"></i>&ensp; Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out"></i>&ensp; Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-solid fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <LinkContainer to="/admin/users" className="mx-0">
                  <NavDropdown title={"Admin"} id="admin">
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>
                        <i className="fas fa-users"></i>&ensp; Users
                      </NavDropdown.Item>
                    </LinkContainer>{" "}
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>
                        <i className="fas fa-boxes"></i>&ensp; Products
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>
                        <i className="fas fa-file-lines"></i>&ensp; Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
